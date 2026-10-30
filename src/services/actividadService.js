/**
 * Operaciones del contrato REST de actividades (Guía 16).
 *
 * Todas pasan por apiFetch, la única función de acceso HTTP que agrega el
 * encabezado Authorization: Bearer (Guía 17). Las escrituras exigen rol ADMIN
 * en el backend; las lecturas son públicas.
 */
import { apiFetch } from "./api";

const RUTA = "/actividades";

export async function listarActividades() {
  return apiFetch(RUTA);
}

export async function buscarActividad(id) {
  return apiFetch(`${RUTA}/${id}`);
}

export async function crearActividad(datos) {
  return apiFetch(RUTA, {
    method: "POST",
    body: JSON.stringify(datos),
  });
}

export async function actualizarActividad(id, datos) {
  return apiFetch(`${RUTA}/${id}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  });
}

export async function eliminarActividad(id) {
  return apiFetch(`${RUTA}/${id}`, { method: "DELETE" });
}
