import { promises as fs } from "fs";
import path from "path";
import type { Car, CarInput } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "cars.json");

export async function getCars(): Promise<Car[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Car[];
}

export async function getCar(id: string): Promise<Car | undefined> {
  const cars = await getCars();
  return cars.find((c) => c.id === id);
}

async function saveCars(cars: Car[]): Promise<void> {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(cars, null, 2), "utf-8");
  } catch (err) {
    // On Vercel (and most serverless hosts) the deployed filesystem is
    // read-only at runtime, so writes here will fail in production.
    // See README.md "Making admin edits permanent in production".
    throw new Error(
      "STORAGE_READONLY: Could not save changes. The hosting filesystem is read-only in production — connect a database (see README) to persist admin edits."
    );
  }
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
