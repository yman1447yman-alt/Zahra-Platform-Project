import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { isAuthenticated } from "@/lib/auth-check";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const data = await request.json();
    const updatePayload: Record<string, any> = { updatedAt: new Date() };

    const fields = [
      "siteTitle",
      "heroTitle",
      "heroSubtitle",
      "aboutText",
      "whatsappNumber",
      "whatsappMessagePrefix",
      "contactEmail",
      "footerDescription",
      "statsProjects",
      "statsClients",
      "statsYears",
    ];

    fields.forEach((f) => {
      if (data[f] !== undefined) {
        // Clean whatsapp number if provided (strip '+' or spaces)
        if (f === "whatsappNumber" && typeof data[f] === "string") {
          updatePayload[f] = data[f].replace(/[^0-9]/g, "");
        } else {
          updatePayload[f] = data[f];
        }
      }
    });

    const [updated] = await db
      .update(settings)
      .set(updatePayload)
      .where(eq(settings.key, "general"))
      .returning();

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "فشل تحديث إعدادات الموقع." }, { status: 500 });
  }
}
