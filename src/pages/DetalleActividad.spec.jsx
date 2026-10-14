import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import DetalleActividad from "./DetalleActividad";

describe("DetalleActividad", () => {
  it("muestra un mensaje cuando la actividad solicitada no existe", () => {
    render(
      <MemoryRouter initialEntries={["/actividades/999"]}>
        <Routes>
          <Route
            path="/actividades/:id"
            element={<DetalleActividad actividades={[]} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Actividad no encontrada" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("La actividad solicitada no existe.")
    ).toBeInTheDocument();
  });
});
