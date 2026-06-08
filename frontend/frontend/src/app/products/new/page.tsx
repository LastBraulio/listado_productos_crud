"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/services/productService";
import toast from "react-hot-toast";

export default function NewProductPage() {

  const router = useRouter();

  const [message, setMessage] = useState("");

  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [status, setStatus] =
    useState(true);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      await createProduct({
        name,
        description,
        price: Number(price),
        status
      });

      toast.success(
        "Producto creado correctamente"
      );
      setMessage(
        "Producto creado correctamente"
      );

      setTimeout(() => {
        router.push("/products");
      }, 1500);

      //router.push("/products");

    } catch (error) {

      console.error(error);

      toast.error(
        "Error al guardar producto"
      );

    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Nuevo Producto
        </h1>
          {
            message && (

              <div
                className="
                bg-green-100
                text-green-700
                p-3
                rounded
                mb-4"
              >
                {message}
              </div>

            )
          }
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>

            <label className="block mb-2 font-medium">
              Nombre
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border rounded-md p-2"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Descripción
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border rounded-md p-2"
              rows={4}
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Precio
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="w-full border rounded-md p-2"
            />

          </div>

          <div className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={status}
              onChange={(e) =>
                setStatus(e.target.checked)
              }
            />

            <label>
              Activo
            </label>

          </div>

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Guardar
            </button>

            <button
              type="button"
              onClick={() =>
                router.push("/products")
              }
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Volver
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}