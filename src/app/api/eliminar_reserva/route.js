import Database from "../lib/singlenton_db";
import { NextResponse } from "next/server";

const db = Database.instance;


export async function DELETE(req) {
  const { id } = await req.json(); 

  if (!id) {
    return NextResponse.json({ message: 'ID no proporcionado' }, { status: 400 });
  }

  try {
    const query = 'DELETE FROM reservas WHERE idreserva = ?';
    const result = await db.fetchData(query, [id]);

    // Verifica si se eliminó alguna fila
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Reserva no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Reserva eliminada' }, { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}