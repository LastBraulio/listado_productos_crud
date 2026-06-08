"use client";

import { useState } from "react";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Link from "next/link";

export default function LoginPage() {

  const router = useRouter();
  
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password
      });

      localStorage.setItem(
        "token",
        response.token
      );
      toast.success(
        "Bienvenido a Gestion de Productos APP"
      );
      router.push("/products");

    } catch (error) {
      console.error(error);
      toast.error(
        "Credenciales incorrectas"
      );
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Gestión de Productos
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="block mb-2 font-medium">
              Correo
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-md p-2"
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
              className="w-full border rounded-md p-2"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>

        </form>
        <div className="mb-4">  
          <p className="text-center mt-4">
          ¿No tienes cuenta?
          </p>
          <p className="text-center mt-4">
            <Link href="/register" className="text-blue-600 hover:underline">
              Registrarse
            </Link>
          </p>
        </div>

      </div>

    </div>
  );

  /*return (
    <div>

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)}
      />

      <br />

      <button
        onClick={handleSubmit}
      >
        Ingresar
      </button>

      <p>
        ¿No tienes cuenta?
      </p>

      <Link href="/register">
        Registrarse
      </Link>

    </div>
  );*/
}