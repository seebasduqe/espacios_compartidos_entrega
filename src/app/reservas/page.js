"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {

    const [areasComunes, setAreasComunes] = useState([]);

    useEffect(() => {
        const fetchAreasComunes = async () => {
            try {
                const response = await axios.get('/api/list_reservas');
                setAreasComunes(response.data);
            } catch (error) {
                console.error('Error fetching areas comunes:', error);
            }
        };

        fetchAreasComunes();
    }, []);


    const handleDelete = async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`/api/eliminar_reserva`, { data: { id } });
            console.log(response);
            window.location.reload();
            //setAreasComunes(areasComunes.filter(area => area.idarea_comun !== id));
        } catch (error) {
            console.error('Error deleting reserva:', error);
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

            <h1 className="text-6xl font-bold text-white">
                Grupo Espacios Compartidos
            </h1>

            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

                <div className="flex gap-9 items-center flex-col sm:flex-row">
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {areasComunes.map((area_comun) => (
                            <article key={area_comun.idarea_comun} className="flex max-w-xl flex-col items-start justify-between">
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-200 group-hover:text-gray-600">
                                        <span>
                                            <span className="absolute inset-0" />
                                            {area_comun.nombre}
                                        </span>
                                    </h3>
                                    <br/>
                                </div>

                                {area_comun.reservas.map((reserva, index) => (
                                    <div key={reserva.idreserva}>
                                        <p className="line-clamp-3 text-sm leading-6 text-gray-300">{reserva.descripcion}</p>
                                        <div className="flex items-center gap-x-4 text-xs">
                                            <p className="fuente -texto en negrita-gris-300">
                                                <span>
                                                    <span className="recuadro absoluto-0" />
                                                    {reserva.fecha_inicio} - {reserva.fecha_final}
                                                </span>
                                            </p>

                                            <Link href={`/reserva/${reserva.idreserva}/edit`}>
                                                <button className="flex items-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                                                    Editar
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDelete(reserva.idreserva)} className="flex items-center bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                                                Eliminar
                                            </button>
                                        </div>
                                        <br/>
                                    </div>
                                ))}
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <span
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Patrones de Diseño
                </span>
                <span
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    App web Gestion de Espacios
                </span>
                <span
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Pablo, Nicole, Sebas, Fabricio y Juan
                </span>
            </footer>
        </div>
    );
}
