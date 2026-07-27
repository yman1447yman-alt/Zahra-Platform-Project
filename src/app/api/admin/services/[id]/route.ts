import { NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth-check";
import { eq } from "drizzle-orm";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const srvId = parseInt(id, 10);
    const { title, description, iconName, priceRange, sortOrder } = await request.json();

    const updatePayload: Record<string, any> = {};
    if (title !== undefined) updatePayload.title = title;
    if (description !== undefined) updatePayload.description = description;
    if (iconName !== undefined) updatePayload.iconName = iconName;
    if (priceRange !== undefined) updatePayload.priceRange = priceRange;
    if (sortOrder !== undefined) updatePayload.sortOrder = Number(sortOrder);

    const [updated] = await db.update(services).set(updatePayload).where(eq(services.id, srvId)).returning();
    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: "فشل تعديل الخدمة." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const srvId = parseInt(id, 10);
    await db.delete(services).where(eq(services.id, srvId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "فشل حذف الخدمة." }, { status: 500 });
  }
}
