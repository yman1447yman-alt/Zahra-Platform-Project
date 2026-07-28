import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("zahra_admin_session");
  cookieStore.delete("injaz_admin_session");
  return NextResponse.json({ success: true, message: "تم تسجيل الخروج بنجاح" });
}
