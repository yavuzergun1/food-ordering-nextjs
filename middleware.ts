import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAuth = req.cookies.has("token");
  console.log(isAuth);

  const url = req.url;
  console.log("url", url);

  if (isAuth && req.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(
      new URL("/admin/profile", "http://localhost:3000/admin")
    );
  }
      if(!isAuth && url.includes("/admin/profile")) {
      const pathname = req.nextUrl.pathname;
      return NextResponse.redirect("http://localhost:3000/admin");
    }
}

// export const config = {
//   matcher: "/admin",
// };
