import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export function middleware(req: NextRequest) {
  console.log("isAuth", req.cookies.has("token"));
  const isAuth = req.cookies.has("token");
    if (isAuth) {
      console.log("REQ",req.url);
      
    return NextResponse.redirect(
      new URL("/admin/profile", "http://localhost:3000/admin")
    );
  }
}

export const config = {
  matcher: "/admin",
};
