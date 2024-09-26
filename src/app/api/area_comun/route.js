import { getPool } from "../lib/singlenton_db";
const pool = getPool();

export async function POST(request) {

    try{
        const { nombre, descripcion, capacidad } = await request.json();
        
        const result = await pool.query(
            `INSERT INTO areas_comunes (nombre, descripcion, capacidad)
             VALUES ($1, $2, $3) RETURNING *`,
            [nombre, descripcion, capacidad]
          );
        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: error }, { status: 401 });
    }
}
