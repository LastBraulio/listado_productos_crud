"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product, PagedResult } from "@/types/product";
import { getProducts } from "@/services/productService";
import {
  deleteProduct
} from "@/services/productService";
import {
  downloadPdf
} from "@/services/productService";

import Link from "next/link";
import ProductTable from "@/components/ProductTable";
import toast from "react-hot-toast";

export default function ProductsPage() {

  const router = useRouter();

  const [products, setProducts] =
    useState<Product[]>([]);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] = useState(true);

  async function loadProducts() {

    try {

      setLoading(true);

      const response =
        await getProducts(
          page,
          10,
          search
        );

      setProducts(response.data);

      setTotalPages(
        response.totalPages
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }
  async function handleDelete(
    id: string
    ) {

    const confirmDelete =
        window.confirm(
        "¿Eliminar producto?"
        );

    if (!confirmDelete)
        return;

    try {

        await deleteProduct(id);
        
        loadProducts();

        toast.success(
          "Producto eliminado"
        );

    } catch (error) {

        console.error(error);

        toast.error(
          "Error al eliminar producto"
        );

    }
}
    async function handleDownloadPdf() {

    try {

        const blob =
        await downloadPdf();

        const url =
        window.URL.createObjectURL(
            blob
        );

        const link =
        document.createElement("a");

        link.href = url;

        link.download =
        "productos.pdf";

        document.body.appendChild(
        link
        );

        link.click();

        link.remove();

        window.URL.revokeObjectURL(
        url
        );

    } catch (error) {

        console.error(error);

        toast.error(
          "Error al descargar PDF"
        );

    }
  }
  function handleLogout() {
    localStorage.removeItem("token");
    toast.success(
      "Sesión cerrada"
    );
    setTimeout(() => {
      router.push("/login");
    }, 1000);
    //router.push("/login");
  }

  useEffect(() => {

    const token =
    localStorage.getItem(
      "token"
    );

    if (!token) {
        router.push("/login");
    }

    loadProducts();

  }, [page]);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div
            className="
            animate-spin
            rounded-full
            h-12
            w-12
            border-b-2
            border-blue-600
            mx-auto
            "
          />

          <p className="mt-4">
            Cargando productos...
          </p>

        </div>

      </div>

    );

  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Gestión de Productos
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cerrar Sesión
          </button>

        </div>

        <div className="flex gap-3 mb-6">

          <Link
            href="/products/new"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Nuevo Producto
          </Link>

          <button
            onClick={handleDownloadPdf}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Descargar PDF
          </button>

        </div>

        <div className="flex gap-2 mb-6">

          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded p-2 w-96 bg-white"
          />

          <button
            onClick={loadProducts}
            className="bg-gray-800 text-white px-4 rounded"
          >
            Buscar
          </button>

        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">


          <ProductTable
            products={products}
            onDelete={handleDelete}
          />

        </div>

        <div className="flex justify-center items-center gap-4 mt-6">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
            className="bg-gray-700 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Anterior
          </button>

          <span className="font-medium">
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage(page + 1)
            }
            className="bg-gray-700 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Siguiente
          </button>

        </div>

      </div>

    </div>
  );
}