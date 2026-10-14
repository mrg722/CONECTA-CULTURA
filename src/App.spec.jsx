import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const futuroRouter = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

function renderApp(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]} future={futuroRouter}>
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
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

    const obtenerTarjetaGuitarra = () =>
      within(screen.getByRole("heading", { name: "Taller de guitarra" }).closest("article"));

    await usuario.click(
      obtenerTarjetaGuitarra().getByRole("button", { name: "Inscribirme" })
    );

    expect(obtenerTarjetaGuitarra().getByText("Cupos: 11")).toBeInTheDocument();

    await usuario.click(
      obtenerTarjetaGuitarra().getByRole("button", { name: "Inscribirme" })
    );

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("inscripciones"))).toHaveLength(1);
    });
    expect(obtenerTarjetaGuitarra().getByText("Cupos: 11")).toBeInTheDocument();
  });

  it("elimina una inscripción guardada y devuelve el cupo", async () => {
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

    await usuario.click(screen.getByRole("link", { name: "Actividades" }));
    expect(
      within(screen.getByRole("heading", { name: "Taller de guitarra" }).closest("article"))
        .getByText("Cupos: 12")
    ).toBeInTheDocument();
  });

  it("permite crear y eliminar una actividad desde la administración", async () => {
    const usuario = userEvent.setup();
    renderApp("/admin/actividades");

    await usuario.type(screen.getByLabelText("Nombre"), "Taller de cerámica");
    await usuario.selectOptions(screen.getByLabelText("Categoría"), "Artes visuales");
    await usuario.type(screen.getByLabelText("Cupos"), "4");
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));

    const titulo = screen.getByRole("heading", { name: "Taller de cerámica" });
    expect(titulo).toBeInTheDocument();

    await usuario.click(
      within(titulo.closest("article")).getByRole("button", { name: "Eliminar" })
    );

    expect(screen.queryByRole("heading", { name: "Taller de cerámica" })).not.toBeInTheDocument();
  });

  it.each([
    ["/categorias", "Categorías", "Música"],
    ["/ofertas", "Ofertas", "Sección de ofertas de Conecta Cultura."],
    ["/ruta-inexistente", "Página no encontrada", "La dirección solicitada no corresponde a una vista disponible."]
  ])("renderiza correctamente la ruta %s", (ruta, encabezado, contenido) => {
    renderApp(ruta);

    expect(screen.getByRole("heading", { name: encabezado })).toBeInTheDocument();
    expect(screen.getByText(contenido)).toBeInTheDocument();
  });
});
