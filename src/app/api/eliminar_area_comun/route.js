import { getPool } from "../lib/singlenton_db";
const pool = getPool();

export async function DELETE(req) {
  const { id } = await req.json(); 

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID no proporcionado' }), { status: 400 });
  }

  try {
    const result = await pool.query('DELETE FROM areas_comunes WHERE idarea_comun = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: 'Área común no encontrada' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Área común eliminada' }), { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}