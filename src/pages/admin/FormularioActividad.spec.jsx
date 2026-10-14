import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import FormularioActividad from "./FormularioActividad";

afterEach(() => {
  cleanup();
});

describe("FormularioActividad", () => {
  it("muestra mensajes de validación al enviar los campos vacíos", async () => {
    const usuario = userEvent.setup();
    const onGuardar = vi.fn();

    render(<FormularioActividad onGuardar={onGuardar} />);
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByText("Nombre obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Selecciona categoría")).toBeInTheDocument();
    expect(screen.getByText("Cupos obligatorios")).toBeInTheDocument();
    expect(onGuardar).not.toHaveBeenCalled();
  });

  it("rechaza un número negativo de cupos", async () => {
    const usuario = userEvent.setup();
    const onGuardar = vi.fn();

    render(<FormularioActividad onGuardar={onGuardar} />);
    await usuario.type(screen.getByLabelText("Nombre"), "Taller de prueba");
    await usuario.selectOptions(screen.getByLabelText("Categoría"), "Cultura");
    await usuario.type(screen.getByLabelText("Cupos"), "-1");
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByText("No puede ser negativo")).toBeInTheDocument();
    expect(onGuardar).not.toHaveBeenCalled();
  });
});
