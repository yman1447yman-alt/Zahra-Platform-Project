import { NextResponse } from "next/server";
import { db } from "@/db";
import { works, categories } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth-check";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح لك بإجراء هذه العملية." }, { status: 401 });
  }

  try {
    const data = await request.json();
    const {
      title,
      description,
      categoryId,
      categoryName: providedCatName,
      price,
      coverImage,
      galleryImages,
      pdfUrl,
      isFeatured,
    } = data;

    if (!title || !description || !coverImage) {
      return NextResponse.json({ error: "الرجاء تعبئة الحقول الأساسية وتعيين صورة غلاف." }, { status: 400 });
    }

    let resolvedCategoryName = providedCatName || "عام";
    let cid: number | null = null;

    if (categoryId) {
      cid = Number(categoryId);
      const cat = await db.select().from(categories).where(eq(categories.id, cid));
      if (cat.length > 0) {
        resolvedCategoryName = cat[0].name;
      }
    }

    const galleryJson = Array.isArray(galleryImages) ? JSON.stringify(galleryImages) : JSON.stringify([coverImage]);

    const [newWork] = await db
      .insert(works)
      .values({
        title,
        description,
        categoryId: cid,
        categoryName: resolvedCategoryName,
        price: price || "99 ريال",
        coverImage,
        galleryImages: galleryJson,
        pdfUrl: pdfUrl || null,
        isFeatured: Boolean(isFeatured),
        orderCount: 0,
      })
      .returning();

    return NextResponse.json({ success: true, work: newWork });
  } catch (error) {
    console.error("Error creating work:", error);
    return NextResponse.json({ error: "فشل إنشاء النموذج في قاعدة البيانات." }, { status: 500 });
  }
}
