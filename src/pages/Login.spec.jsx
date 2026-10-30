import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const navegar = vi.fn();

vi.mock("react-router-dom", async (original) => ({
  ...(await original()),
  useNavigate: () => navegar
}));

vi.mock("../services/authService", () => ({ iniciarSesion: vi.fn() }));

import { iniciarSesion } from "../services/authService";
import { AuthProvider } from "../context/AuthProvider";
import Login from "./Login";

function renderLogin() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );
}

async function ingresar(usuario, clave) {
  await usuario.type(screen.getByLabelText("Usuario"), "admin");
  await usuario.type(screen.getByLabelText("Contraseña"), clave);
  await usuario.click(screen.getByRole("button", { name: "Ingresar" }));
}

beforeEach(() => {
  sessionStorage.clear();
  vi.resetAllMocks();
});

describe("Login", () => {
  it("guarda la sesión y vuelve al inicio cuando las credenciales son válidas", async () => {
    const usuario = userEvent.setup();
    iniciarSesion.mockResolvedValue({
      token: "token-de-prueba",
      usuario: "admin",
      rol: "ADMIN"
    });

    renderLogin();
    await ingresar(usuario, "clave-de-prueba");

    expect(iniciarSesion).toHaveBeenCalledWith("admin", "clave-de-prueba");
    expect(sessionStorage.getItem("token")).toBe("token-de-prueba");
    expect(JSON.parse(sessionStorage.getItem("usuario"))).toEqual({
      usuario: "admin",
      rol: "ADMIN"
    });
    expect(navegar).toHaveBeenCalledWith("/", { replace: true });
  });

  it("muestra el rechazo del backend y no guarda sesión", async () => {
    const usuario = userEvent.setup();
    iniciarSesion.mockRejectedValue(new Error("Solicitud rechazada: 401"));

    renderLogin();
    await ingresar(usuario, "mala");

    expect(await screen.findByRole("alert")).toHaveTextContent("Solicitud rechazada: 401");
    expect(sessionStorage.getItem("token")).toBeNull();
    expect(navegar).not.toHaveBeenCalled();
  });
});
