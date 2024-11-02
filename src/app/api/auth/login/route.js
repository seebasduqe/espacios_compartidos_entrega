import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import Database from "../../lib/singlenton_db";

export async function POST(request) {
  const { email, password } = await request.json();

  const db = Database.instance;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  try {
    const results = await db.fetchData(query, [email, password]);

    const idUser = results[0].id;
    
    if (results.length > 0) {
      // Si las credenciales son válidas
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          email,
          username: results[0].username, // Asumiendo que 'username' está en la tabla
        },
        "secret"
      );

      const response = NextResponse.json({ token, idUser });

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
      // Si no hay coincidencias en la base de datos
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(
      {
        message: "Error verifying credentials",
      },
      {
        status: 500,
      }
    );
  }
}
