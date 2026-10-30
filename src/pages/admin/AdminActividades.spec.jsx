import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../services/actividadService", () => ({
  listarActividades: vi.fn(),
  eliminarActividad: vi.fn()
}));

import {
  eliminarActividad,
  listarActividades
} from "../../services/actividadService";
import AdminActividades from "./AdminActividades";

const catalogo = [
  { id: 1, nombre: "Taller de guitarra", categoria: "Música" },
  { id: 2, nombre: "Acuarela inicial", categoria: "Artes visuales" }
];

function renderAdmin() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AdminActividades />
    </MemoryRouter>
  );
}

let confirmar;

beforeEach(() => {
  vi.resetAllMocks();
  confirmar = vi.spyOn(window, "confirm");
});

afterEach(() => {
  confirmar.mockRestore();
});

describe("AdminActividades", () => {
  it("ofrece enlaces para crear y editar cada actividad", async () => {
    listarActividades.mockResolvedValue(catalogo);

    renderAdmin();

    expect(await screen.findByRole("link", { name: "Nueva actividad" }))
      .toHaveAttribute("href", "/admin/actividades/nueva");
    expect(screen.getAllByRole("link", { name: "Editar" })[0])
      .toHaveAttribute("href", "/admin/actividades/1/editar");
  });

  it("conserva la actividad cuando se rechaza la confirmación", async () => {
    const usuario = userEvent.setup();
    listarActividades.mockResolvedValue(catalogo);
    confirmar.mockReturnValue(false);

    renderAdmin();
    const titulo = await screen.findByRole("heading", { name: "Taller de guitarra" });

    await usuario.click(
      within(titulo.closest("article")).getByRole("button", { name: "Eliminar" })
    );

    expect(eliminarActividad).not.toHaveBeenCalled();
    expect(screen.getByRole("heading", { name: "Taller de guitarra" })).toBeInTheDocument();
  });

  it("informa el error cuando la API rechaza la eliminación", async () => {
    const usuario = userEvent.setup();
    listarActividades.mockResolvedValue(catalogo);
    eliminarActividad.mockRejectedValue(new Error("Solicitud rechazada: 403"));
    confirmar.mockReturnValue(true);

    renderAdmin();
    const titulo = await screen.findByRole("heading", { name: "Taller de guitarra" });

    await usuario.click(
      within(titulo.closest("article")).getByRole("button", { name: "Eliminar" })
    );

    await waitFor(() => {
      expect(screen.getByText("Solicitud rechazada: 403")).toBeInTheDocument();
    });
    expect(screen.getByRole("heading", { name: "Taller de guitarra" })).toBeInTheDocument();
  });

  it("informa el error cuando no puede cargar el listado", async () => {
    listarActividades.mockRejectedValue(new Error("Solicitud rechazada: 500"));

    renderAdmin();

    expect(await screen.findByText("Solicitud rechazada: 500")).toBeInTheDocument();
  });
});
