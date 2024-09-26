import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getPool } from "../../lib/singlenton_db";

const pool = getPool();

export async function POST(request) {
  const { email, password } = await request.json();

  if (email === "sebassduqe" && password === "casados123") {
    // expire in 30 days
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email,
        username: "fazt",
      },
      "secret"
    );

    const response = NextResponse.json({
      token,
    });

    response.cookies.set({
      name: "myTokenName",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json(
      {
        message: "Invalid credentials",
      },
      {
        status: 401,
      }
    );
  }
}
