import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("./services/actividadService", () => ({
  listarActividades: vi.fn(),
  buscarActividad: vi.fn(),
  crearActividad: vi.fn(),
  actualizarActividad: vi.fn(),
  eliminarActividad: vi.fn()
}));

import {
  eliminarActividad,
  listarActividades
} from "./services/actividadService";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

const futuroRouter = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

const catalogo = [
  {
    id: 1,
    nombre: "Taller de guitarra",
    categoria: "Música",
    descripcion: "Taller introductorio para aprender acordes básicos.",
    precio: 0,
    cupos: 12
  },
  {
    id: 2,
    nombre: "Acuarela inicial",
    categoria: "Artes visuales",
    descripcion: "Color y técnicas.",
    precio: 5000,
    cupos: 6
  }
];

function renderApp(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]} future={futuroRouter}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );
}

function sesion(rol) {
  sessionStorage.setItem("token", "token-de-prueba");
  sessionStorage.setItem(
    "usuario",
    JSON.stringify({ usuario: rol.toLowerCase(), rol })
  );
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  vi.resetAllMocks();
  listarActividades.mockResolvedValue(catalogo);
});

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("presenta inicio, navegación, imagen y pie de página", () => {
    renderApp("/");

    expect(screen.getAllByRole("heading", { name: "Conecta Cultura" })).toHaveLength(2);
    expect(screen.getByRole("img", { name: "Conecta Cultura" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver actividades" })).toHaveAttribute("href", "/actividades");
    expect(screen.getByRole("link", { name: "hola@conectacultura.cl" })).toBeInTheDocument();
  });

  it("inscribe una actividad una sola vez y persiste los cambios", async () => {
    const usuario = userEvent.setup();
    renderApp("/actividades");

    await screen.findByRole("heading", { name: "Taller de guitarra" });

    const obtenerTarjetaGuitarra = () =>
      within(screen.getByRole("heading", { name: "Taller de guitarra" }).closest("article"));

    await usuario.click(
      obtenerTarjetaGuitarra().getByRole("button", { name: "Inscribirme" })
    );

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("inscripciones"))).toHaveLength(1);
    });

    await usuario.click(
      obtenerTarjetaGuitarra().getByRole("button", { name: "Inscribirme" })
    );

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("inscripciones"))).toHaveLength(1);
    });
  });

  it("elimina una inscripción guardada", async () => {
    const usuario = userEvent.setup();
    localStorage.setItem(
      "inscripciones",
      JSON.stringify([
        {
          id: 1,
          nombre: "Taller de guitarra",
          categoria: "Música",
          descripcion: "Taller introductorio para aprender acordes básicos.",
          precio: 0,
          cupos: 12
        }
      ])
    );

    renderApp("/inscripciones");
    expect(screen.getByRole("heading", { name: "Taller de guitarra" })).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(screen.getByText("No hay actividades inscritas.")).toBeInTheDocument();

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("inscripciones"))).toEqual([]);
    });
  });

  it("redirige al login cuando la ruta administrativa no tiene sesión", () => {
    renderApp("/admin/actividades");

    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeInTheDocument();
    expect(listarActividades).not.toHaveBeenCalled();
  });

  it("devuelve al inicio cuando la sesión no tiene rol ADMIN", () => {
    sesion("USER");
    renderApp("/admin/actividades");

    expect(
      screen.getByRole("link", { name: "Ver actividades" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Administración de actividades" })
    ).not.toBeInTheDocument();
  });

  it("permite a un ADMIN eliminar una actividad desde la administración", async () => {
    const usuario = userEvent.setup();
    const confirmar = vi.spyOn(window, "confirm").mockReturnValue(true);
    eliminarActividad.mockResolvedValue(null);

    sesion("ADMIN");
    renderApp("/admin/actividades");

    const titulo = await screen.findByRole("heading", { name: "Taller de guitarra" });

    await usuario.click(
      within(titulo.closest("article")).getByRole("button", { name: "Eliminar" })
    );

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Taller de guitarra" })).not.toBeInTheDocument();
    });

    expect(eliminarActividad).toHaveBeenCalledWith(1);
    expect(screen.getByRole("heading", { name: "Acuarela inicial" })).toBeInTheDocument();
    confirmar.mockRestore();
  });

  it("muestra el rol y cierra la sesión del ADMIN", async () => {
    const usuario = userEvent.setup();
    sesion("ADMIN");
    renderApp("/");

    expect(await screen.findByText("admin (ADMIN)")).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Cerrar sesión" }));

    expect(sessionStorage.getItem("token")).toBeNull();
    expect(sessionStorage.getItem("usuario")).toBeNull();
    expect(screen.getByRole("link", { name: "Iniciar sesión" })).toBeInTheDocument();
  });

  it.each([
    ["/categorias", "Categorías", "Música"],
    ["/ofertas", "Ofertas", "Sección de ofertas de Conecta Cultura."],
    ["/ruta-inexistente", "Página no encontrada", "La dirección solicitada no corresponde a una vista disponible."]
  ])("renderiza correctamente la ruta %s", async (ruta, encabezado, contenido) => {
    renderApp(ruta);

    expect(
      await screen.findByRole("heading", { name: encabezado })
    ).toBeInTheDocument();
    expect(await screen.findByText(contenido)).toBeInTheDocument();
  });
});
