import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    console.log("request", req.nextUrl.pathname);
    return NextResponse.next()
    
}