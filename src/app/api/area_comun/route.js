import Database from "../lib/singlenton_db";
import { NextResponse } from "next/server";

const db = Database.instance;

export async function POST(request) {
    try {
        const { nombre, descripcion, capacidad } = await request.json();
        
        // Inserta los datos
        const insertQuery = `
            INSERT INTO areas_comunes (nombre, descripcion, capacidad)
            VALUES (?, ?, ?)`;
        
        await db.fetchData(insertQuery, [nombre, descripcion, capacidad]);

        // Consulta para obtener el último registro insertado
        const selectQuery = `
            SELECT * FROM areas_comunes 
            ORDER BY id DESC LIMIT 1`;
        
        const result = await db.fetchData(selectQuery, [nombre, descripcion, capacidad]);
        
        return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
    }
}
