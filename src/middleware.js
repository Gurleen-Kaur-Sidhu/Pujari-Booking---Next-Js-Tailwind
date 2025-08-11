import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value; // ✅ get role

  const pathname = request.nextUrl.pathname;

  const isUserDashboard = pathname.startsWith("/userdashboard");
  const isPujariDashboard = pathname.startsWith("/pujaridashboard");

  // 🔒 Block access if token missing for protected routes
  // const protectedRoutes = ["/userdashboard", "/booknow", "/pujaridashboard"];
  const protectedRoutes =['']
  
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // if (isProtected && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // ❌ Block if user tries to access pujari dashboard
  // if (isPujariDashboard && role !== "pujari") {
  //   return NextResponse.redirect(new URL("/userdashboard", request.url));
  // }

  // ❌ Block if pujari tries to access user dashboard
  // if (isUserDashboard && role !== "user") {
  //   return NextResponse.redirect(new URL("/pujaridashboard", request.url));
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/userdashboard/:path*", "/booknow/:path*", "/pujaridashboard/:path*"],
// };
