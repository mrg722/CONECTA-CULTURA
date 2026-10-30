import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./api", () => ({ apiFetch: vi.fn() }));

import { apiFetch } from "./api";
import {
  actualizarActividad,
  buscarActividad,
  crearActividad,
  eliminarActividad,
  listarActividades
} from "./actividadService";

const datos = {
  nombre: "Taller de cueca",
  descripcion: "Taller inicial",
  precio: 5000,
  cupos: 20,
  categoria: "Danza"
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("actividadService", () => {
  it("lista con GET sobre la colección", async () => {
    apiFetch.mockResolvedValue([]);

    await expect(listarActividades()).resolves.toEqual([]);
    expect(apiFetch).toHaveBeenCalledWith("/actividades");
  });

  it("busca una actividad por id", async () => {
    apiFetch.mockResolvedValue({ id: 1 });

    await expect(buscarActividad(1)).resolves.toEqual({ id: 1 });
    expect(apiFetch).toHaveBeenCalledWith("/actividades/1");
  });

  it("crea con POST y cuerpo JSON", async () => {
    apiFetch.mockResolvedValue({ id: 1, ...datos });

    await crearActividad(datos);

    expect(apiFetch).toHaveBeenCalledWith("/actividades", {
      method: "POST",
      body: JSON.stringify(datos)
    });
  });

  it("actualiza con PUT sobre el recurso indicado", async () => {
    apiFetch.mockResolvedValue({ id: 7, ...datos });

    await actualizarActividad(7, datos);

    expect(apiFetch).toHaveBeenCalledWith("/actividades/7", {
      method: "PUT",
      body: JSON.stringify(datos)
    });
  });

  it("elimina con DELETE sobre el recurso indicado", async () => {
    apiFetch.mockResolvedValue(null);

    await expect(eliminarActividad(7)).resolves.toBeNull();
    expect(apiFetch).toHaveBeenCalledWith("/actividades/7", { method: "DELETE" });
  });
});
