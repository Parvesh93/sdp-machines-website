import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const configuredToken = process.env.DIAGNOSTIC_TOKEN;
  const suppliedToken = request.nextUrl.searchParams.get("token");

  if (!configuredToken) {
    return NextResponse.json(
      {
        ok: false,
        error: "DIAGNOSTIC_TOKEN is not configured.",
      },
      { status: 500 },
    );
  }

  if (!suppliedToken || suppliedToken !== configuredToken) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized.",
      },
      { status: 401 },
    );
  }

  const env = {
    DATABASE_HOST: Boolean(process.env.DATABASE_HOST),
    DATABASE_PORT: Boolean(process.env.DATABASE_PORT),
    DATABASE_USER: Boolean(process.env.DATABASE_USER),
    DATABASE_PASSWORD: Boolean(process.env.DATABASE_PASSWORD),
    DATABASE_NAME: Boolean(process.env.DATABASE_NAME),
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    AUTH_SECRET: Boolean(process.env.AUTH_SECRET),
    AUTH_URL: Boolean(process.env.AUTH_URL),
    AUTH_TRUST_HOST: Boolean(process.env.AUTH_TRUST_HOST),
  };

  try {
    await prisma.$queryRaw`SELECT 1`;

    const user = await prisma.user.findUnique({
      where: {
        email: "admin@sdpmachines.com",
      },
      select: {
        email: true,
        name: true,
        role: true,
        active: true,
      },
    });

    return NextResponse.json({
      ok: true,
      runtime: {
        nodeEnv: process.env.NODE_ENV ?? null,
      },
      env,
      database: {
        connection: "ok",
        userTable: "ok",
      },
      admin: user
        ? {
            found: true,
            email: user.email,
            name: user.name,
            role: user.role,
            active: user.active,
          }
        : {
            found: false,
          },
    });
  } catch (error) {
    console.error("[diagnostics][db]", error);

    return NextResponse.json(
      {
        ok: false,
        env,
        database: {
          connection: "failed",
        },
        error: {
          name:
            error instanceof Error
              ? error.name
              : "UnknownError",
          message:
            error instanceof Error
              ? error.message
              : "Unknown database error.",
        },
      },
      { status: 500 },
    );
  }
}
