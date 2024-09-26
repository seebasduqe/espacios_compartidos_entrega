import { getPool } from "../../lib/singlenton_db";
const pool = getPool();

export async function POST(request) {

    try{
        const { username, nombre, apellido1, apellido2, email, password, direccion, telefono } = await request.json();
        const result = await pool.query(
            `INSERT INTO users (username, nombre, apellido1, apellido2, email, password, direccion, telefono)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [username, nombre, apellido1, apellido2, email, password, direccion, telefono]
          );
        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error);
        return NextResponse.json({ error: error }, { status: 401 });
    }
}
