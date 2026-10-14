import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("./pages/Actividades", () => ({
  default: function ActividadesDePrueba({ actividades, onInscribir }) {
    const actividadAgotada = actividades.find((actividad) => actividad.cupos === 0);

    return (
      <button onClick={() => onInscribir(actividadAgotada)}>
        Probar inscripción sin cupos
      </button>
    );
  }
}));

import App from "./App";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  localStorage.clear();
});

describe("resguardo de inscripción en App", () => {
  it("rechaza una inscripción aunque el manejador reciba una actividad agotada", async () => {
    render(
      <MemoryRouter initialEntries={["/actividades"]} future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Probar inscripción sin cupos" }));

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("inscripciones"))).toEqual([]);
    });
  });
});
