import { describe, expect, it, vi } from "vitest";
import { obtenerNombres } from "./actividades";

describe("obtenerNombres", () => {
  it("devuelve los nombres desde un servicio asíncrono simulado", async () => {
    const servicio = {
      listar: vi.fn().mockResolvedValue([
        { id: 1, nombre: "Guitarra", cupos: 10 }
      ])
    };

    const nombres = await obtenerNombres(servicio);

    expect(servicio.listar).toHaveBeenCalledOnce();
    expect(nombres).toEqual(["Guitarra"]);
  });
});
