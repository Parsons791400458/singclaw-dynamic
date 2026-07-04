import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isClerkFullyConfigured } from "@/lib/clerk-config";

const clerkConfigured = isClerkFullyConfigured();
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/reports(.*)",
]);

// Clerk v6: clerkMiddleware 在没 key 时也会初始化并 throw. 绕开方法: 未配时直接 NextResponse.next().
const realClerkMiddleware = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export default function middleware(req: NextRequest) {
  if (!clerkConfigured) {
    return NextResponse.next();
  }
  return realClerkMiddleware(req, {} as any);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};