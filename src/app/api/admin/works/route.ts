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

    // تحويل الصور إلى نص JSON String متوافق مع حقل الـ text في السكيما
    const imagesArray = Array.isArray(galleryImages) && galleryImages.length > 0 
      ? galleryImages 
      : [coverImage];
    const galleryJson = JSON.stringify(imagesArray);

    const [newWork] = await db
      .insert(works)
      .values({
        title,
        description,
        categoryId: cid,
        categoryName: resolvedCategoryName,
        price: price || "95 ريال",
        coverImage,
        galleryImages: galleryJson,
        pdfUrl: pdfUrl || null,
        isFeatured: Boolean(isFeatured),
        orderCount: 0,
      })
      .returning();

    return NextResponse.json({ success: true, work: newWork });
  } catch (error: any) {
    console.error("Error creating work details:", error);
    return NextResponse.json({ error: `فشل إنشاء النموذج: ${error?.message || "خطأ غير معروف"}` }, { status: 500 });
  }
}