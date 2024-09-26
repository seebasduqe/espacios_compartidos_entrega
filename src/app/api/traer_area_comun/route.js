import { getPool } from "../lib/singlenton_db";

export async function GET(req) {

  const pool = getPool();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
        return new Response(JSON.stringify({ message: 'ID no proporcionado' }), { status: 400 });
    }
  
    try {
      const result = await pool.query('SELECT * FROM areas_comunes WHERE idarea_comun = $1', [id]);
  
      if (result.rowCount === 0) {
        return new Response(JSON.stringify({ message: 'Área común no encontrada' }), { status: 404 });
      }
  
      return new Response(JSON.stringify(result.rows[0]), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
}
  