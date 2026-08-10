import { NextResponse } from "next/server";

import { auth } from "../auth";

export const proxy = auth((request) => {
  const pathname = request.nextUrl.pathname;

  const isLoggedIn = Boolean(
    request.auth?.user
  );

  console.log("PROXY CHECK", {
    pathname,
    isLoggedIn,
    email:
      request.auth?.user?.email ??
      null,
  });

  if (
    pathname.startsWith("/admin") &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    pathname === "/login" &&
    isLoggedIn
  ) {
    return NextResponse.redirect(
      new URL("/admin", request.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
  ],
};