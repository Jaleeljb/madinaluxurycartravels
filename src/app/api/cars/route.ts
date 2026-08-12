import { NextRequest, NextResponse } from "next/server";
import { listCars, createCar } from "@/lib/db/queries";
import { carInputSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

// GET /api/cars?category=SUV&availableOnly=true — public, used by the fleet section.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const availableOnly = searchParams.get("availableOnly") === "true";

  try {
    const data = await listCars({ category, availableOnly });
    return NextResponse.json({ cars: data });
  } catch (err) {
    console.error("Failed to list cars:", err);
    return NextResponse.json(
      { error: "Couldn't load the fleet right now. Please try again shortly." },
      { status: 500 }
    );
  }
}

// POST /api/cars — admin only, creates a new vehicle.
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = carInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid car details." },
      { status: 400 }
    );
  }

  try {
    const car = await createCar({ ...parsed.data, isDemo: false });
    return NextResponse.json({ car }, { status: 201 });
  } catch (err) {
    console.error("Failed to create car:", err);
    return NextResponse.json({ error: "Couldn't save the car. Please try again." }, { status: 500 });
  }
}
