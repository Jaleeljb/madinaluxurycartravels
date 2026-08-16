import { NextRequest, NextResponse } from "next/server";
import { getCars, addCar } from "@/lib/data";
import { SESSION_COOKIE, SESSION_VALUE } from "@/lib/auth";

export async function GET() {
  try {
    const cars = await getCars();
    return NextResponse.json(cars);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load the fleet.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get(SESSION_COOKIE)?.value;
  if (session !== SESSION_VALUE) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await req.json();
  const required = ["name", "category", "seats", "bags", "pricePerDay", "currency", "image", "whatsapp", "description"];
  for (const key of required) {
    if (body[key] === undefined || body[key] === "") {
      return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
    }
  }

  try {
    const car = await addCar({
      name: body.name,
      category: body.category,
      seats: Number(body.seats),
      bags: Number(body.bags),
      pricePerDay: Number(body.pricePerDay),
      currency: body.currency,
      image: body.image,
      whatsapp: body.whatsapp,
      description: body.description,
      featured: Boolean(body.featured),
      available: body.available !== undefined ? Boolean(body.available) : true,
      unavailableDates: Array.isArray(body.unavailableDates) ? body.unavailableDates : [],
    });
    return NextResponse.json(car, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save car.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
