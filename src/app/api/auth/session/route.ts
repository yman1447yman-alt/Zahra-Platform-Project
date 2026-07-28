import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const sessionZahra = cookieStore.get("zahra_admin_session");
  const sessionOld = cookieStore.get("injaz_admin_session");
  
  const isLoggedIn = (sessionZahra && sessionZahra.value === "authenticated") || (sessionOld && sessionOld.value === "authenticated");
  return NextResponse.json({ authenticated: Boolean(isLoggedIn) });
}
