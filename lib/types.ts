export interface Car {
  id: string;
  name: string;
  category: string;
  seats: number;
  bags: number;
  pricePerDay: number;
  currency: string;
  image: string;
  whatsapp: string;
  description: string;
  featured: boolean;
}

export type CarInput = Omit<Car, "id">;
