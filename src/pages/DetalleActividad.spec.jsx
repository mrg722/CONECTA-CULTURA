import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../services/actividadService", () => ({
  buscarActividad: vi.fn()
}));

import { buscarActividad } from "../services/actividadService";
import DetalleActividad from "./DetalleActividad";

function renderDetalle(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/actividades/:id" element={<DetalleActividad />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.resetAllMocks();
});

describe("DetalleActividad", () => {
  it("muestra los datos cuando encuentra la actividad solicitada", async () => {
    buscarActividad.mockResolvedValue({
      id: 2,
      nombre: "Acuarela inicial",
      categoria: "Artes visuales",
      descripcion: "Sesión práctica de acuarela.",
      precio: 5000,
      cupos: 6
    });

    renderDetalle("/actividades/2");

    expect(
      await screen.findByRole("heading", { name: "Acuarela inicial" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sesión práctica de acuarela.")
    ).toBeInTheDocument();
    expect(buscarActividad).toHaveBeenCalledWith("2");
  });

  it("muestra el aviso genérico cuando la API no devuelve actividad", async () => {
    buscarActividad.mockResolvedValue(null);

    renderDetalle("/actividades/5");

    expect(
      await screen.findByRole("heading", { name: "Actividad no encontrada" })
    ).toBeInTheDocument();
    expect(screen.getByText("La actividad solicitada no existe.")).toBeInTheDocument();
  });

  it("muestra un mensaje cuando la API responde 404", async () => {
    buscarActividad.mockRejectedValue(new Error("Solicitud rechazada: 404"));

    renderDetalle("/actividades/999");

    expect(
      await screen.findByRole("heading", { name: "Actividad no encontrada" })
    ).toBeInTheDocument();
    expect(screen.getByText("Solicitud rechazada: 404")).toBeInTheDocument();
  });
});
