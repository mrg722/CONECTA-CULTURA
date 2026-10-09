import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import TarjetaActividad from "./TarjetaActividad";

describe("TarjetaActividad", () => {
  const actividad = {
    id: 1,
    nombre: "Guitarra",
    categoria: "Música",
    descripcion: "Taller introductorio.",
    precio: 0,
    cupos: 4
  };

  it("muestra el nombre recibido mediante props", () => {
    render(
      <MemoryRouter>
        <TarjetaActividad
          actividad={actividad}
          onInscribir={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Guitarra" })
    ).toBeInTheDocument();
  });

  it("muestra el aviso cuando quedan pocos cupos", () => {
    render(
      <MemoryRouter>
        <TarjetaActividad
          actividad={actividad}
          onInscribir={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/últimos/i)).toBeInTheDocument();
  });

  it("ejecuta onInscribir al presionar el botón", async () => {
    const usuario = userEvent.setup();
    const onInscribir = vi.fn();

    render(
      <MemoryRouter>
        <TarjetaActividad
          actividad={actividad}
          onInscribir={onInscribir}
        />
      </MemoryRouter>
    );

    await usuario.click(
      screen.getByRole("button", { name: /inscribirme/i })
    );

    expect(onInscribir).toHaveBeenCalledWith(actividad);
  });
});
