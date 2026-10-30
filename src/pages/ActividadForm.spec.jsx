import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const navegar = vi.fn();

vi.mock("react-router-dom", async (original) => ({
  ...(await original()),
  useNavigate: () => navegar
}));

vi.mock("../services/actividadService", () => ({
  buscarActividad: vi.fn(),
  crearActividad: vi.fn(),
  actualizarActividad: vi.fn()
}));

import {
  actualizarActividad,
  buscarActividad,
  crearActividad
} from "../services/actividadService";
import ActividadForm from "./ActividadForm";

const actividad = {
  id: 7,
  nombre: "Taller de cueca",
  descripcion: "Taller inicial",
  precio: 5000,
  cupos: 20,
  categoria: "Danza"
};

function renderForm(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/admin/actividades/nueva" element={<ActividadForm />} />
        <Route path="/admin/actividades/:id/editar" element={<ActividadForm />} />
      </Routes>
    </MemoryRouter>
  );
}

async function completar(usuario) {
  await usuario.type(screen.getByLabelText("Nombre"), actividad.nombre);
  await usuario.type(screen.getByLabelText("Descripción"), actividad.descripcion);
  await usuario.clear(screen.getByLabelText("Precio"));
  await usuario.type(screen.getByLabelText("Precio"), String(actividad.precio));
  await usuario.clear(screen.getByLabelText("Cupos"));
  await usuario.type(screen.getByLabelText("Cupos"), String(actividad.cupos));
  await usuario.type(screen.getByLabelText("Categoría"), actividad.categoria);
}

beforeEach(() => {
  vi.resetAllMocks();
});

describe("ActividadForm", () => {
  it("crea una actividad y envía los números como números", async () => {
    const usuario = userEvent.setup();
    crearActividad.mockResolvedValue({ id: 1, ...actividad });

    renderForm("/admin/actividades/nueva");
    expect(screen.getByRole("heading", { name: "Nueva actividad" })).toBeInTheDocument();

    await completar(usuario);
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));

    expect(crearActividad).toHaveBeenCalledWith({
      nombre: actividad.nombre,
      descripcion: actividad.descripcion,
      precio: actividad.precio,
      cupos: actividad.cupos,
      categoria: actividad.categoria
    });
    expect(navegar).toHaveBeenCalledWith("/admin/actividades");
  });

  it("carga la actividad existente y la actualiza", async () => {
    const usuario = userEvent.setup();
    buscarActividad.mockResolvedValue(actividad);
    actualizarActividad.mockResolvedValue(actividad);

    renderForm("/admin/actividades/7/editar");

    expect(screen.getByRole("heading", { name: "Editar actividad" })).toBeInTheDocument();
    expect(await screen.findByDisplayValue(actividad.nombre)).toBeInTheDocument();
    expect(buscarActividad).toHaveBeenCalledWith("7");

    await usuario.click(screen.getByRole("button", { name: "Guardar" }));

    expect(actualizarActividad).toHaveBeenCalledWith("7", actividad);
    expect(navegar).toHaveBeenCalledWith("/admin/actividades");
  });

  it("muestra el mensaje del backend cuando el guardado falla", async () => {
    const usuario = userEvent.setup();
    crearActividad.mockRejectedValue(new Error("Solicitud rechazada: 403"));

    renderForm("/admin/actividades/nueva");
    await completar(usuario);
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Solicitud rechazada: 403");
    expect(navegar).not.toHaveBeenCalled();
  });

  it("informa cuando no puede cargar la actividad a editar", async () => {
    buscarActividad.mockRejectedValue(new Error("Solicitud rechazada: 404"));

    renderForm("/admin/actividades/999/editar");

    expect(await screen.findByRole("alert")).toHaveTextContent("Solicitud rechazada: 404");
  });
});
