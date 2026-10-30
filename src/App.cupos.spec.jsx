import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

const actividadAgotada = {
  id: 9,
  nombre: "Taller agotado",
  categoria: "Música",
  descripcion: "Sin cupos disponibles.",
  precio: 0,
  cupos: 0
};

vi.mock("./pages/Actividades", () => ({
  default: function ActividadesDePrueba({ onInscribir }) {
    return (
      <button onClick={() => onInscribir(actividadAgotada)}>
        Probar inscripción sin cupos
      </button>
    );
  }
}));

import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe("resguardo de inscripción en App", () => {
  it("rechaza una inscripción aunque el manejador reciba una actividad agotada", async () => {
    render(
      <MemoryRouter initialEntries={["/actividades"]} future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Probar inscripción sin cupos" }));

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("inscripciones"))).toEqual([]);
    });
  });
});
