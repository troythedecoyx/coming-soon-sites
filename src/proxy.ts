import { NextRequest, NextResponse } from "next/server";
import { resolveSiteId } from "@/lib/sites";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");
  const siteId = resolveSiteId(host);

  const url = request.nextUrl.clone();
  // Internally rewrite every request to the matching site's route group,
  // so each domain serves its own page while sharing one deployment.
  url.pathname = `/sites/${siteId}${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - _next (static files, image optimization)
     * - favicon, sitemap, robots, and files with an extension (images, etc.)
     * - /sites/* directly, so each site's route is reachable for local
     *   preview/screenshotting without depending on Host-header spoofing
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sites/|.*\\..*).*)",
  ],
};
