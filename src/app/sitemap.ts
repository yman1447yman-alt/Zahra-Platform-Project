import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://zahra-platform-project.vercel.app",
      lastModified: new Date(),
    },
  ];
}