"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { register } from "@/services/authService";

import toast from "react-hot-toast";

export default function RegisterPage() {

  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      await register({
        name: userName,
        email,
        password
      });

      toast.success(
        "Usuario registrado correctamente"
      );

      router.push("/login");

    } catch (error) {

      console.error(error);

      toast.error(
        "Error al registrar usuario"
      );

    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Registro de Usuario
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="block mb-2 font-medium">
              Usuario
            </label>

            <input
              type="text"
              value={userName}
              onChange={(e) =>
                setUserName(e.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div className="mb-4">

            <label className="block mb-2 font-medium">
              Correo Electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div className="mb-6">

            <label className="block mb-2 font-medium">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Registrarse
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-600">
            ¿Ya tienes cuenta?
          </p>

          <Link
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Iniciar Sesión
          </Link>

        </div>

      </div>

    </div>

  );
}