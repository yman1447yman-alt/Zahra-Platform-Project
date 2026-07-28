import { cookies } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionZahra = cookieStore.get("zahra_admin_session");
  const sessionOld = cookieStore.get("injaz_admin_session");
  return Boolean((sessionZahra && sessionZahra.value === "authenticated") || (sessionOld && sessionOld.value === "authenticated"));
}
