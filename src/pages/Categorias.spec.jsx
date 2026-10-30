import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../services/actividadService", () => ({
  listarActividades: vi.fn()
}));

import { listarActividades } from "../services/actividadService";
import Categorias from "./Categorias";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Categorias", () => {
  it("lista sin repetir las categorías que devuelve la API", async () => {
    listarActividades.mockResolvedValue([
      { id: 1, nombre: "Taller de guitarra", categoria: "Música" },
      { id: 2, nombre: "Coro", categoria: "Música" },
      { id: 3, nombre: "Acuarela inicial", categoria: "Artes visuales" }
    ]);

    render(<Categorias />);

    expect(await screen.findByText("Música")).toBeInTheDocument();
    expect(screen.getByText("Artes visuales")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("informa el error cuando la API rechaza la solicitud", async () => {
    listarActividades.mockRejectedValue(new Error("Solicitud rechazada: 500"));

    render(<Categorias />);

    expect(await screen.findByText("Solicitud rechazada: 500")).toBeInTheDocument();
  });
});
