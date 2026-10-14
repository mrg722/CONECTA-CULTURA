/**
 * Ejemplo didáctico de inyección de dependencias para probar un servicio
 * asíncrono sin conectarse a Internet ni a una API real.
 */
export async function obtenerNombres(servicio) {
  const actividades = await servicio.listar();
  return actividades.map((actividad) => actividad.nombre);
}
