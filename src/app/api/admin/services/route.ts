import { NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth-check";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { title, description, iconName, priceRange, sortOrder } = await request.json();
    if (!title || !description) {
      return NextResponse.json({ error: "اسم الخدمة والوصف مطلوبان." }, { status: 400 });
    }

    const [srv] = await db
      .insert(services)
      .values({
        title,
        description,
        iconName: iconName || "FileText",
        priceRange: priceRange || "حسب الطلب",
        sortOrder: sortOrder ? Number(sortOrder) : 0,
      })
      .returning();

    return NextResponse.json({ success: true, service: srv });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "فشل إضافة الخدمة." }, { status: 500 });
  }
}
