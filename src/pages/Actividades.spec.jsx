import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Actividades from "./Actividades";

describe("Actividades", () => {
  it("actualiza los resultados cuando cambia el filtro de categoría", async () => {
    const usuario = userEvent.setup();
    const actividades = [
      {
        id: 1,
        nombre: "Taller de guitarra",
        categoria: "Música",
        descripcion: "Acordes iniciales",
        precio: 0,
        cupos: 8
      },
      {
        id: 2,
        nombre: "Acuarela inicial",
        categoria: "Artes visuales",
        descripcion: "Color y técnicas",
        precio: 5000,
        cupos: 6
      }
    ];

    render(
      <MemoryRouter>
        <Actividades actividades={actividades} onInscribir={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Taller de guitarra" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Acuarela inicial" })).toBeInTheDocument();

    await usuario.selectOptions(
      screen.getByRole("combobox", { name: /filtrar por categoría/i }),
      "Artes visuales"
    );

    expect(screen.getByRole("heading", { name: "Acuarela inicial" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Taller de guitarra" })).not.toBeInTheDocument();
  });
});
