import { NextResponse } from "next/server";
import { db } from "@/db";
import { works, categories } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth-check";
import { eq } from "drizzle-orm";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح لك بإجراء هذه العملية." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const workId = parseInt(id, 10);
    if (isNaN(workId)) {
      return NextResponse.json({ error: "المعرّف غير صالح." }, { status: 400 });
    }

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

    let resolvedCategoryName = providedCatName;
    let cid: number | null = categoryId ? Number(categoryId) : null;

    if (cid) {
      const cat = await db.select().from(categories).where(eq(categories.id, cid));
      if (cat.length > 0) {
        resolvedCategoryName = cat[0].name;
      }
    }

    const updatePayload: Record<string, any> = {
      updatedAt: new Date(),
    };
    if (title !== undefined) updatePayload.title = title;
    if (description !== undefined) updatePayload.description = description;
    if (cid !== undefined) updatePayload.categoryId = cid;
    if (resolvedCategoryName !== undefined) updatePayload.categoryName = resolvedCategoryName;
    if (price !== undefined) updatePayload.price = price;
    if (coverImage !== undefined) updatePayload.coverImage = coverImage;
    if (galleryImages !== undefined) {
      updatePayload.galleryImages = Array.isArray(galleryImages) ? JSON.stringify(galleryImages) : JSON.stringify([]);
    }
    if (pdfUrl !== undefined) updatePayload.pdfUrl = pdfUrl || null;
    if (isFeatured !== undefined) updatePayload.isFeatured = Boolean(isFeatured);

    const [updated] = await db.update(works).set(updatePayload).where(eq(works.id, workId)).returning();
    return NextResponse.json({ success: true, work: updated });
  } catch (error) {
    console.error("Error updating work:", error);
    return NextResponse.json({ error: "فشل تعديل النموذج." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح لك بإجراء هذه العملية." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const workId = parseInt(id, 10);
    if (isNaN(workId)) {
      return NextResponse.json({ error: "المعرّف غير صالح." }, { status: 400 });
    }

    await db.delete(works).where(eq(works.id, workId));
    return NextResponse.json({ success: true, message: "تم حذف النموذج بنجاح." });
  } catch (error) {
    console.error("Error deleting work:", error);
    return NextResponse.json({ error: "فشل حذف النموذج." }, { status: 500 });
  }
}
