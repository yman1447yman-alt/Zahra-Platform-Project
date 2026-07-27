import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories, works, services, settings, testimonials, faqs } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";
import { desc, asc } from "drizzle-orm";

export async function GET() {
  try {
    await ensureSeeded();

    const [allSettings] = await db.select().from(settings);
    const allCategories = await db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.id));
    const allWorks = await db.select().from(works).orderBy(desc(works.id));
    const allServices = await db.select().from(services).orderBy(asc(services.sortOrder), asc(services.id));
    const allTestimonials = await db.select().from(testimonials).orderBy(desc(testimonials.id));
    const allFaqs = await db.select().from(faqs).orderBy(asc(faqs.sortOrder), asc(faqs.id));

    // parse galleryImages for works cleanly
    const formattedWorks = allWorks.map((item) => {
      let gallery: string[] = [];
      try {
        gallery = JSON.parse(item.galleryImages || "[]");
        if (!Array.isArray(gallery)) gallery = [item.coverImage];
      } catch {
        gallery = [item.coverImage];
      }
      return {
        ...item,
        galleryImages: gallery,
      };
    });

    return NextResponse.json({
      settings: allSettings || null,
      categories: allCategories,
      works: formattedWorks,
      services: allServices,
      testimonials: allTestimonials,
      faqs: allFaqs,
    });
  } catch (error) {
    console.error("Error fetching platform data:", error);
    return NextResponse.json({ error: "تعذر إحضار بيانات المنصة." }, { status: 500 });
  }
}
