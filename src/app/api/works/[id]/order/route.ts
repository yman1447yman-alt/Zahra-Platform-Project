import { NextResponse } from "next/server";
import { db } from "@/db";
import { works } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const workId = parseInt(id, 10);
    if (!isNaN(workId)) {
      await db.update(works).set({ orderCount: sql`${works.orderCount} + 1` }).where(eq(works.id, workId));
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating order count:", error);
    return NextResponse.json({ error: "تعذر التحديث" }, { status: 500 });
  }
}
