import { NextResponse } from "next/server";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth-check";
import { eq } from "drizzle-orm";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const faqId = parseInt(id, 10);
    const { question, answer, sortOrder } = await request.json();

    const updatePayload: Record<string, any> = {};
    if (question !== undefined) updatePayload.question = question;
    if (answer !== undefined) updatePayload.answer = answer;
    if (sortOrder !== undefined) updatePayload.sortOrder = Number(sortOrder);

    const [updated] = await db.update(faqs).set(updatePayload).where(eq(faqs.id, faqId)).returning();
    return NextResponse.json({ success: true, faq: updated });
  } catch (error) {
    console.error("Error updating faq:", error);
    return NextResponse.json({ error: "فشل التعديل." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const faqId = parseInt(id, 10);
    await db.delete(faqs).where(eq(faqs.id, faqId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting faq:", error);
    return NextResponse.json({ error: "فشل الحذف." }, { status: 500 });
  }
}
