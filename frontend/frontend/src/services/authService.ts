import api from "./api";
import { LoginRequest } from "@/types/auth";
import { RegisterRequest } from "@/types/auth";

export async function login(
  data: LoginRequest
) {
  const response =
    await api.post(
      "/auth/login",
      data
    );

  return response.data;
}

export async function register(
  data: RegisterRequest
) {

  const response =
    await api.post(
      "/auth/register",
      data
    );

  return response.data;
}