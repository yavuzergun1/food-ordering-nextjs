import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAuth = req.cookies.has("token");
  console.log(isAuth);

  const host = req.nextUrl.protocol + req.headers.get("host");
  console.log("host", host);

  const url = req.url;
  console.log("url", url);

  // if is logged in, it redirects to admin/profile page when you go to admin page
  if (isAuth && req.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(
      new URL("/admin/profile", "http://localhost:3000/admin")
    );
  }
  // if you're not logged in, it redirects to /admin page when you go to admin/profile page
  if (!isAuth && url.includes("/admin/profile")) {
    const pathname = req.nextUrl.pathname;
    return NextResponse.redirect(`${host}/admin`);
  }
}

// export const config = {
//   matcher: "/admin",
// };
