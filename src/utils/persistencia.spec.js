import { describe, expect, it, vi } from "vitest";
import { guardarInscripciones } from "./persistencia";

describe("guardarInscripciones", () => {
  it("guarda el arreglo serializado en localStorage", () => {
    const datos = [{ id: 1, nombre: "Guitarra" }];
    localStorage.clear();
    const espia = vi.spyOn(Storage.prototype, "setItem");

    try {
      guardarInscripciones(datos);
      expect(espia).toHaveBeenCalledWith("inscripciones", JSON.stringify(datos));
      expect(localStorage.getItem("inscripciones")).toBe(JSON.stringify(datos));
    } finally {
      espia.mockRestore();
    }
  });
});
