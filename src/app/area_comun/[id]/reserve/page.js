"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head'
import Image from "next/image"
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { useAuth } from '@/app/AuthContext';

const CrearReserva = () => {

    const { id } = useParams();
    const { idUser } = useAuth();

    console.log(idUser);

    const [reserva, setReserva] = useState({
        descripcion: '',
        fecha_inicio: '',
        fecha_final: '',
        estado: 'PENDIENTE',
        idarea_comun: id,
        iduser: idUser,
    });

    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    //DATOS PARA EL AREA COMUN
    const [area, setArea] = useState(null);
    const [nombre, setNombre] = useState('');

    //TRAER DATOS AREA COMUN
    useEffect(() => {
        const fetchArea = async () => {
            if (id) {
                const response = await axios.get(`/api/traer_area_comun`, { params: { id } });
                setArea(response.data);
                setNombre(response.data.nombre);
            }
        };
        fetchArea();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const res = await axios.post("/api/reserva", reserva);
            console.log(res);
            if (res.status === 201) {
              console.log(res.data);
              router.push("/dashboard");
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 500) setErrorMessage("No guardo por algun motivo, llena bien los campos, escribe bien las fechas");
                else setErrorMessage("Error: " + error.response.data.error);
            }
        }
    };

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 2000);

            return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
        }
    }, [errorMessage]);


    if (!area) return <div>Cargando...</div>;

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Head>
                <title>Gestion Espacios</title>
                <meta name="description" content="App web Gestion Espacios" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-6xl font-bold text-white">
                Hacer Reserva en
            </h1>
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

                <div className="flex gap-9 items-center flex-col sm:flex-row">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">

                                <h2 className="text-base font-semibold leading-7 text-gray-400 text-center">{nombre}</h2>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    <div className="col-span-full">
                                        <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-400">
                                            Descripcion Solicitud
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="descripcion"
                                                name="descripcion"
                                                type="text"
                                                placeholder='breve descripcion solicitud'
                                                autoComplete="street-address"
                                                className="block w-full bg-gray-800 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) =>
                                                    setReserva({
                                                        ...reserva,
                                                        descripcion: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="fecha_inicio" className="block text-sm font-medium leading-6 text-gray-400">
                                            Desde
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="fecha_inicio"
                                                name="fecha_inicio"
                                                type="date"
                                                autoComplete="given-name"
                                                className="block w-full bg-gray-800 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) =>
                                                    setReserva({
                                                        ...reserva,
                                                        fecha_inicio: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="fecha_final" className="block text-sm font-medium leading-6 text-gray-400">
                                            Hasta
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="fecha_final"
                                                name="fecha_final"
                                                type="date"
                                                autoComplete="family-name"
                                                className="block w-full bg-gray-800  rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) =>
                                                    setReserva({
                                                        ...reserva,
                                                        fecha_final: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ArrowRightIcon className="h-5 w-5 mr-2" />
                                Hacer Reserva
                            </button>
                        </div>
                    </form>

                </div>

                {errorMessage && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
                        {errorMessage}
                    </div>
                )}
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
};

export default CrearReserva;
