export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  status: boolean;
  userCreation: string;
  creationDate: string;
  userModification?: string;
  modificationDate?: string;
}

export interface PagedResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}