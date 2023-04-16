import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("PATHNAME", req.nextUrl.pathname);
  const isAdminAuth = req.cookies.has("admin_token");
  // console.log(isAdminAuth);


  const sessionToken = req.cookies.has("__Secure-next-auth.session-token");
  // console.log("ISSESSION", sessionToken);

  const host = req.nextUrl.protocol + req.headers.get("host");
  // console.log("host", host);

  const url = req.url;
  // console.log("url", url);

  // if is admin logged in, it redirects to admin/profile page when you go to admin page
  if (isAdminAuth && req.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(
      new URL("/admin/adminprofile/products", `${host}/admin`)
    );
  }
  // if you're not admin logged in, it redirects to /admin page when you go to admin/profile page
  if (!isAdminAuth && url.includes("/admin/adminprofile")) {
    const pathname = req.nextUrl.pathname;
    return NextResponse.redirect(`${host}/admin`);
  }

  // user login control

  // if (sessionToken && req.nextUrl.pathname === "/auth/login") {
  //   return NextResponse.redirect(`${host}/profile/account`);
  // } else if (!sessionToken && req.nextUrl.pathname.includes("/profile")) {
  //   return NextResponse.redirect(`${host}/auth/login`);
  // }
}

// export const config = {
//   matcher: "/admin",
// };
