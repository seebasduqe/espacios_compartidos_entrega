import { getPool } from "./lib/singlenton_db";

export async function GET(request) {
  const pool = getPool();
/*  
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS areas_comunes (
      idarea_comun SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      descripcion TEXT,
      capacidad INT,
      img_url VARCHAR(255)
    );
    `;
    await pool.query(createTableQuery);
    console.log('Tabla "areas_comunes" creada o ya existe.');
  } catch (error) {
    console.error('Error al crear la tabla:', error);
  }
*/

  try {
    const result = await pool.query(`SELECT * FROM areas_comunes`); // Ajusta la consulta según tu necesidad
    return new Response(JSON.stringify(result.rows), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

}