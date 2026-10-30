import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../services/actividadService", () => ({
  listarActividades: vi.fn()
}));

import { listarActividades } from "../services/actividadService";
import Actividades from "./Actividades";

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

function renderActividades() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Actividades onInscribir={vi.fn()} />
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Actividades", () => {
  it("actualiza los resultados cuando cambia el filtro de categoría", async () => {
    const usuario = userEvent.setup();
    listarActividades.mockResolvedValue(actividades);

    renderActividades();

    expect(
      await screen.findByRole("heading", { name: "Taller de guitarra" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Acuarela inicial" })).toBeInTheDocument();

    await usuario.selectOptions(
      screen.getByRole("combobox", { name: /filtrar por categoría/i }),
      "Artes visuales"
    );

    expect(screen.getByRole("heading", { name: "Acuarela inicial" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Taller de guitarra" })).not.toBeInTheDocument();
  });

  it("muestra un indicador mientras consulta la API", async () => {
    listarActividades.mockResolvedValue(actividades);

    renderActividades();

    expect(screen.getByLabelText("Cargando actividades")).toBeInTheDocument();
    await screen.findByRole("heading", { name: "Taller de guitarra" });
  });

  it("informa el error cuando la API rechaza la solicitud", async () => {
    listarActividades.mockRejectedValue(new Error("Solicitud rechazada: 500"));

    renderActividades();

    expect(await screen.findByText("Solicitud rechazada: 500")).toBeInTheDocument();
  });

  it("avisa cuando la API no devuelve actividades", async () => {
    listarActividades.mockResolvedValue([]);

    renderActividades();

    expect(await screen.findByText("No hay actividades.")).toBeInTheDocument();
  });
});
