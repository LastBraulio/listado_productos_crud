import Link from "next/link";
import { Product } from "@/types/product";
import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  onDelete
}: ProductTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "description",
        header: "Descripción",
    },
    {
        accessorKey: "price",
        header: "Precio",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) =>
        row.original.status
            ? "Activo"
            : "Inactivo",
    },
    {
        header: "Acciones",
        cell: ({ row }) => (
        <div className="flex gap-2">

            <Link
            href={`/products/edit/${row.original.id}`}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
            Editar
            </Link>

            <button
            onClick={() =>
                onDelete(row.original.id)
            }
            className="bg-red-600 text-white px-3 py-1 rounded"
            >
            Eliminar
            </button>

        </div>
        )
    }];
    const table = useReactTable({
        data: products,
        columns,

        state: {
            sorting,
        },

        onSortingChange:
            setSorting,

        getCoreRowModel:
            getCoreRowModel(),

        getSortedRowModel:
            getSortedRowModel(),
    });

  return (

    <table className="w-full">

        <thead className="bg-gray-200">

            {table
            .getHeaderGroups()
            .map((headerGroup) => (

            <tr key={headerGroup.id}>

                {headerGroup.headers.map(
                (header) => (

                <th
                    key={header.id}
                    className="p-3 text-left cursor-pointer"
                    onClick={
                        header.column.getToggleSortingHandler()
                    }
                >

                    <>
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}

                    {header.column.getIsSorted() === "asc"
                        ? " ↑"
                        : header.column.getIsSorted() === "desc"
                        ? " ↓"
                        : ""}
                    </>
                </th>

                ))}

            </tr>

            ))}

        </thead>

        <tbody>

            {table
            .getRowModel()
            .rows
            .map((row) => (

            <tr
                key={row.id}
                className="border-t"
            >

                {row
                .getVisibleCells()
                .map((cell) => (

                <td
                    key={cell.id}
                    className="p-3"
                >

                    {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                    )}

                </td>

                ))}

            </tr>

            ))}

        </tbody>

    </table>

  );
}