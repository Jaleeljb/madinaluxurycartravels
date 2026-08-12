import { and, eq, desc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { cars, type Car, type NewCar } from "@/lib/db/schema";

export type CarFilter = {
  category?: string;
  availableOnly?: boolean;
};

export async function listCars(filter: CarFilter = {}): Promise<Car[]> {
  const db = getDb();
  const conditions = [];
  if (filter.category && filter.category !== "All") {
    conditions.push(eq(cars.category, filter.category));
  }
  if (filter.availableOnly) {
    conditions.push(eq(cars.available, true));
  }

  return db
    .select()
    .from(cars)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(cars.available), desc(cars.createdAt));
}

export async function getCarById(id: number): Promise<Car | undefined> {
  const db = getDb();
  const rows = await db.select().from(cars).where(eq(cars.id, id)).limit(1);
  return rows[0];
}

export async function createCar(input: NewCar): Promise<Car> {
  const db = getDb();
  const rows = await db.insert(cars).values(input).returning();
  return rows[0];
}

export async function updateCar(id: number, input: Partial<NewCar>): Promise<Car | undefined> {
  const db = getDb();
  const rows = await db
    .update(cars)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(cars.id, id))
    .returning();
  return rows[0];
}

export async function deleteCar(id: number): Promise<boolean> {
  const db = getDb();
  const rows = await db.delete(cars).where(eq(cars.id, id)).returning({ id: cars.id });
  return rows.length > 0;
}

export async function getFleetStats() {
  const all = await listCars();
  return {
    total: all.length,
    available: all.filter((c) => c.available).length,
    unavailable: all.filter((c) => !c.available).length,
    onOffer: all.filter((c) => c.offerPrice < c.originalPrice).length,
  };
}
