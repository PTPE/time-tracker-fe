import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login"];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (pathname === "/") {
    const isAuthenticated = accessToken || refreshToken;
    return NextResponse.redirect(
      new URL(isAuthenticated ? "/timer" : "/login", request.url),
    );
  }

  if (isPublicPath && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/timer", request.url));
  }

  if (accessToken || refreshToken || isPublicPath) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)"],
};
