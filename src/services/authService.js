/**
 * Login contra POST /api/auth/login (Guía 17).
 *
 * La respuesta entrega token, usuario y rol; el contexto de autenticación los
 * guarda en sessionStorage para restaurar la sesión al recargar.
 */
import { apiFetch } from "./api";

export async function iniciarSesion(username, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}
