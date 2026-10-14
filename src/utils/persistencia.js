export function guardarInscripciones(datos) {
  localStorage.setItem("inscripciones", JSON.stringify(datos));
}
