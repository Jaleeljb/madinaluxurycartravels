import { NextRequest, NextResponse } from "next/server";
import { updateCar, deleteCar } from "@/lib/data";
import { SESSION_COOKIE, SESSION_VALUE } from "@/lib/auth";

function isAuthed(req: NextRequest) {
  return req.cookies.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await updateCar(id, {
      ...body,
      seats: body.seats !== undefined ? Number(body.seats) : undefined,
      bags: body.bags !== undefined ? Number(body.bags) : undefined,
      pricePerDay: body.pricePerDay !== undefined ? Number(body.pricePerDay) : undefined,
    });
    if (!updated) {
      return NextResponse.json({ error: "Car not found." }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update car.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;

  try {
    const ok = await deleteCar(id);
    if (!ok) {
      return NextResponse.json({ error: "Car not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete car.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
