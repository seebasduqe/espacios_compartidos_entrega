"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation';

import { useRouter } from "next/navigation"
import Head from 'next/head'
import Image from "next/image"
import { ArrowRightIcon } from '@heroicons/react/24/solid'

const EditAreaComún = () => {

  const { id } = useParams();

  const [area, setArea] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [capacidad, setCapacidad] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchArea = async () => {
      if (id) {
        const response = await axios.get(`/api/traer_area_comun`,{params: { id }});
        setArea(response.data);
        setNombre(response.data.nombre);
        setDescripcion(response.data.descripcion);
        setCapacidad(response.data.capacidad);
      }
    };
    fetchArea();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ id, nombre, descripcion, capacidad });
      await axios.put('/api/editar_area_comun',{ id, nombre, descripcion, capacidad });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating area:', error);
    }
  };

  if (!area) return <div>Cargando...</div>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <Head>
        <title>Gestion Espacios</title>
        <meta name="description" content="App web Gestion Espacios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-6xl font-bold text-white">
            Grupo Espacios Compartidos
        </h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      
        <div className="flex gap-9 items-center flex-col sm:flex-row">
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">

                <h2 className="text-base font-semibold leading-7 text-gray-400 text-center">CREAR AREA COMUN</h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="col-span-full">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-400">
                      Nombre
                    </label>
                    <div className="mt-2">
                      <input
                        id="street-address"
                        name="nombre"
                        type="text"
                        value={nombre}
                        autoComplete="street-address"
                        className="block w-full bg-gray-800 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-400">
                      Descripcion
                    </label>
                    <div className="mt-2">
                      <input
                        id="descripcion"
                        name="descripcion"
                        type="text"
                        value={descripcion}
                        autoComplete="street-address"
                        className="block w-full bg-gray-800 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-400">
                      Capacidad
                    </label>
                    <div className="mt-2">
                      <input
                        id="capacidad"
                        name="capacidad"
                        type="text"
                        value={capacidad}
                        autoComplete="street-address"
                        className="block w-full bg-gray-800 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setCapacidad(e.target.value)}
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
                Editar Area Comun
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

export default EditAreaComún;
