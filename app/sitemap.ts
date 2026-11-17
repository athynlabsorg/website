import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://athynlabs.com", lastModified: new Date() }];
}
