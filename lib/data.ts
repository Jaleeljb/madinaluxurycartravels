import { promises as fs } from "fs";
import path from "path";
import type { Car, CarInput } from "./types";
import { getDb, CARS_KEY } from "./db";

const SEED_PATH = path.join(process.cwd(), "data", "cars.json");

async function readSeedFile(): Promise<Car[]> {
  const raw = await fs.readFile(SEED_PATH, "utf-8");
  return JSON.parse(raw) as Car[];
}

async function writeSeedFile(cars: Car[]): Promise<void> {
  try {
    await fs.writeFile(SEED_PATH, JSON.stringify(cars, null, 2), "utf-8");
  } catch {
    throw new Error(
      "No database is connected, and this hosting environment's filesystem is read-only, so the change couldn't be saved. See README.md \u201cDatabase setup\u201d \u2014 it's free and takes about two minutes."
    );
  }
}

// ---------------------------------------------------------------------
// Redis is the real, persistent database. All cars live as a single
// JSON array under one key, matching this app's data shape and keeping
// reads/writes to a single round trip. When it's configured (see
// lib/db.ts), it's used for everything, in every environment.
//
// When it ISN'T configured, reads fall back to the bundled seed file
// (data/cars.json) so the public site keeps working either way. Writes
// also fall back to that file, which works fine for local development —
// but will fail with a clear error on read-only hosts like Vercel,
// which is exactly the case this database exists to fix.
// ---------------------------------------------------------------------

export async function getCars(): Promise<Car[]> {
  const db = getDb();
  if (!db) return readSeedFile();

  const existing = await db.get<Car[]>(CARS_KEY);
  if (existing) return existing;

  // First run: seed the database from the bundled starter fleet.
  const seed = await readSeedFile();
  await db.set(CARS_KEY, seed);
  return seed;
}

export async function getCar(id: string): Promise<Car | undefined> {
  const cars = await getCars();
  return cars.find((c) => c.id === id);
}

async function saveCars(cars: Car[]): Promise<void> {
  const db = getDb();
  if (db) {
    await db.set(CARS_KEY, cars);
    return;
  }
  await writeSeedFile(cars);
}

export async function addCar(input: CarInput): Promise<Car> {
  const cars = await getCars();
  const id = "c" + Math.random().toString(36).slice(2, 9);
  const car: Car = { id, ...input };
  cars.push(car);
  await saveCars(cars);
  return car;
}

export async function updateCar(id: string, input: Partial<CarInput>): Promise<Car | undefined> {
  const cars = await getCars();
  const idx = cars.findIndex((c) => c.id === id);
  if (idx === -1) return undefined;
  cars[idx] = { ...cars[idx], ...input };
  await saveCars(cars);
  return cars[idx];
}

export async function deleteCar(id: string): Promise<boolean> {
  const cars = await getCars();
  const next = cars.filter((c) => c.id !== id);
  if (next.length === cars.length) return false;
  await saveCars(next);
  return true;
}
