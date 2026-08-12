import { NextRequest, NextResponse } from "next/server";
import { getCarById, updateCar, deleteCar } from "@/lib/db/queries";
import { carInputSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

function parseId(idParam: string) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// GET /api/cars/:id — public, used by the car detail page.
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid car id." }, { status: 400 });

  try {
    const car = await getCarById(id);
    if (!car) return NextResponse.json({ error: "Car not found." }, { status: 404 });
    return NextResponse.json({ car });
  } catch (err) {
    console.error("Failed to load car:", err);
    return NextResponse.json({ error: "Couldn't load this car right now." }, { status: 500 });
  }
}

// PUT /api/cars/:id — admin only.
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid car id." }, { status: 400 });

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
    const car = await updateCar(id, parsed.data);
    if (!car) return NextResponse.json({ error: "Car not found." }, { status: 404 });
    return NextResponse.json({ car });
  } catch (err) {
    console.error("Failed to update car:", err);
    return NextResponse.json({ error: "Couldn't save changes. Please try again." }, { status: 500 });
  }
}

// DELETE /api/cars/:id — admin only.
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid car id." }, { status: 400 });

  try {
    const deleted = await deleteCar(id);
    if (!deleted) return NextResponse.json({ error: "Car not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete car:", err);
    return NextResponse.json({ error: "Couldn't delete this car. Please try again." }, { status: 500 });
  }
}
