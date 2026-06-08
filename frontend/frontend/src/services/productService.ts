import api from "./api";
import { PagedResult, Product } from "@/types/product";

export async function getProducts(
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
): Promise<PagedResult<Product>> {

  const response = await api.get(
    "/products",
    {
      params: {
        page,
        pageSize,
        search
      }
    }
  );

  return response.data;
}

//create, update, delete functions can be added here as needed

export async function createProduct(data: {
  name: string;
  description?: string;
  price: number;
  status: boolean;
}) {

  const response = await api.post(
    "/products",
    data
  );

  return response.data;
}

export async function getProductById(
  id: string
) {
  const response = await api.get(
    `/products/${id}`
  );

  return response.data;
}

export async function updateProduct(
  id: string,
  data: {
    name: string;
    description?: string;
    price: number;
    status: boolean;
  }
) {

  const response = await api.put(
    `/products/${id}`,
    data
  );

  return response.data;
}

export async function deleteProduct(
  id: string
) {

  const response = await api.delete(
    `/products/${id}`
  );

  return response.data;
}
//PDF export async function exportProductsToPDF() {
export async function downloadPdf() {

  const response = await api.get(
    "/products/report/pdf",
    {
      responseType: "blob"
    }
  );

  return response.data;
}