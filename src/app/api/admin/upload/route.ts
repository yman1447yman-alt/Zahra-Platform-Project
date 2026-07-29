import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "لم يتم اختيار ملف" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // استخراج امتداد الملف الأصلي (مثل png أو jpg)
    const originalName = file.name || "image.png";
    const fileExtension = originalName.split('.').pop() || 'png';

    // توليد اسم إنجليزي آمن وخالٍ من الحروف العربية لتجنب أخطاء التخزين
    const fileName = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;

    const { error } = await supabase.storage
      .from("uploads")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    return NextResponse.json({
      url: data.publicUrl,
      name: file.name,
      type: file.type,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}