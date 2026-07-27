import { NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth-check";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { clientName, clientRole, content, rating, avatar } = await request.json();
    if (!clientName || !content) {
      return NextResponse.json({ error: "الاسم ونص الرأي مطلوبان." }, { status: 400 });
    }

    const [t] = await db
      .insert(testimonials)
      .values({
        clientName,
        clientRole: clientRole || "عميل مميز",
        content,
        rating: rating ? Number(rating) : 5,
        avatar: avatar || "/images/portfolio-cover-1.jpg",
      })
      .returning();

    return NextResponse.json({ success: true, testimonial: t });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: "فشل إضافة الرأي." }, { status: 500 });
  }
}
