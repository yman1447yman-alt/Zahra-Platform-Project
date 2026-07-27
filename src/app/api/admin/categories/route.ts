import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth-check";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { name, slug, description, sortOrder } = await request.json();
    if (!name) {
      return NextResponse.json({ error: "اسم التصنيف مطلوب." }, { status: 400 });
    }

    const resolvedSlug = slug || name.trim().replace(/\s+/g, "-").toLowerCase();

    const [newCat] = await db
      .insert(categories)
      .values({
        name,
        slug: resolvedSlug,
        description: description || null,
        sortOrder: sortOrder ? Number(sortOrder) : 0,
      })
      .returning();

    return NextResponse.json({ success: true, category: newCat });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "فشل إضافة التصنيف." }, { status: 500 });
  }
}
