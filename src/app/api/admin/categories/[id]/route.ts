import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth-check";
import { eq } from "drizzle-orm";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const catId = parseInt(id, 10);
    const { name, slug, description, sortOrder } = await request.json();

    const updatePayload: Record<string, any> = {};
    if (name !== undefined) updatePayload.name = name;
    if (slug !== undefined) updatePayload.slug = slug;
    if (description !== undefined) updatePayload.description = description || null;
    if (sortOrder !== undefined) updatePayload.sortOrder = Number(sortOrder);

    const [updated] = await db.update(categories).set(updatePayload).where(eq(categories.id, catId)).returning();
    return NextResponse.json({ success: true, category: updated });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "فشل تعديل التصنيف." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const catId = parseInt(id, 10);
    await db.delete(categories).where(eq(categories.id, catId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "فشل حذف التصنيف." }, { status: 500 });
  }
}
