import { NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth-check";
import { eq } from "drizzle-orm";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const tId = parseInt(id, 10);
    const { clientName, clientRole, content, rating, avatar } = await request.json();

    const updatePayload: Record<string, any> = {};
    if (clientName !== undefined) updatePayload.clientName = clientName;
    if (clientRole !== undefined) updatePayload.clientRole = clientRole;
    if (content !== undefined) updatePayload.content = content;
    if (rating !== undefined) updatePayload.rating = Number(rating);
    if (avatar !== undefined) updatePayload.avatar = avatar;

    const [updated] = await db.update(testimonials).set(updatePayload).where(eq(testimonials.id, tId)).returning();
    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "فشل التعديل." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const tId = parseInt(id, 10);
    await db.delete(testimonials).where(eq(testimonials.id, tId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "فشل الحذف." }, { status: 500 });
  }
}
