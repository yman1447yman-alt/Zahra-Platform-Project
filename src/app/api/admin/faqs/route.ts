import { NextResponse } from "next/server";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth-check";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { question, answer, sortOrder } = await request.json();
    if (!question || !answer) {
      return NextResponse.json({ error: "السؤال والجواب مطلوبان." }, { status: 400 });
    }

    const [f] = await db
      .insert(faqs)
      .values({
        question,
        answer,
        sortOrder: sortOrder ? Number(sortOrder) : 0,
      })
      .returning();

    return NextResponse.json({ success: true, faq: f });
  } catch (error) {
    console.error("Error creating faq:", error);
    return NextResponse.json({ error: "فشل إضافة السؤال." }, { status: 500 });
  }
}
