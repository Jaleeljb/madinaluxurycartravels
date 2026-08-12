import type { MetadataRoute } from "next";
import { listCars } from "@/lib/db/queries";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const cars = await listCars();
    const carRoutes: MetadataRoute.Sitemap = cars.map((car) => ({
      url: `${siteConfig.siteUrl}/cars/${car.id}`,
      lastModified: car.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
    return [...staticRoutes, ...carRoutes];
  } catch {
    return staticRoutes;
  }
}
