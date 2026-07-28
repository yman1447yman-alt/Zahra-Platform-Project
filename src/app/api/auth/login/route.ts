import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Verify admin credentials for Al-Zahra Platform
    const validUsers = ["admin", "zahra", "manager", "admin@al-zahra-edu.sa", "مدير"];
    const validPass = process.env.ADMIN_PASSWORD || "admin123";

    if (
      validUsers.includes(username?.toLowerCase().trim()) &&
      (password === validPass)
    ) {
      const cookieStore = await cookies();
      cookieStore.set("zahra_admin_session", "authenticated", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 14, // 14 days
        sameSite: "lax",
      });
      // also set fallback
      cookieStore.set("injaz_admin_session", "authenticated", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
        sameSite: "lax",
      });

      return NextResponse.json({ success: true, message: "تم تسجيل الدخول إلى منصة الزهراء بنجاح" });
    }

    return NextResponse.json(
      { success: false, error: "بيانات الدخول غير صحيحة (استخدم: admin وكلمة المرور: admin123)" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: "حدث خطأ غير متوقع في الخادم" }, { status: 500 });
  }
}
