import { getPool } from "../lib/singlenton_db";
const pool = getPool();

export async function PUT(req) {
  const { id, nombre, descripcion, capacidad } = await req.json(); // Obtener datos del cuerpo de la solicitud

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID no proporcionado' }), { status: 400 });
  }

  try {
    const result = await pool.query(
      `UPDATE areas_comunes 
       SET nombre = $1, descripcion = $2, capacidad = $3 
       WHERE idarea_comun = $4 
       RETURNING *`,
      [nombre, descripcion, capacidad, id]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: 'Área común no encontrada' }), { status: 404 });
    }

    // Si la actualización fue exitosa
    return new Response(JSON.stringify({ message: 'Área común actualizada', data: result.rows[0] }), { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
