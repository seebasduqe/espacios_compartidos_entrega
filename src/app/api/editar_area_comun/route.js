import Database from "../lib/singlenton_db";

const db = Database.instance; // Instancia de la base de datos

export async function PUT(req) {
  const { id, nombre, descripcion, capacidad } = await req.json(); // Obtener datos del cuerpo de la solicitud

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID no proporcionado' }), { status: 400 });
  }

  try {
    const updateQuery = `
      UPDATE areas_comunes 
      SET nombre = ?, descripcion = ?, capacidad = ? 
      WHERE idarea_comun = ?`;

    await db.fetchData(updateQuery, [nombre, descripcion, capacidad, id]);

    // Consulta para obtener los datos actualizados
    const selectQuery = `
      SELECT * FROM areas_comunes 
      WHERE idarea_comun = ?`;

    const result = await db.fetchData(selectQuery, [id]);

    if (result.length === 0) {
      return new Response(JSON.stringify({ message: 'Área común no encontrada' }), { status: 404 });
    }

    // Si la actualización fue exitosa
    return new Response(JSON.stringify({ message: 'Área común actualizada', data: result[0] }), { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
