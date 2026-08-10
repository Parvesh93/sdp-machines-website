import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      const isLoggedIn = Boolean(auth?.user);

      console.log("AUTH CHECK", {
        pathname,
        isLoggedIn,
        user: auth?.user?.email ?? null,
      });

      const isAdminRoute = pathname.startsWith("/admin");
      const isLoginRoute = pathname === "/login";

      if (isAdminRoute) {
        return isLoggedIn;
      }

      if (isLoginRoute && isLoggedIn) {
        return Response.redirect(
          new URL("/admin", request.nextUrl)
        );
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;