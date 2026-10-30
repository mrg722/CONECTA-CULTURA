import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./api", () => ({ apiFetch: vi.fn() }));

import { apiFetch } from "./api";
import { iniciarSesion } from "./authService";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("authService", () => {
  it("envía las credenciales a /auth/login y devuelve la sesión", async () => {
    apiFetch.mockResolvedValue({
      token: "token-de-prueba",
      usuario: "admin",
      rol: "ADMIN"
    });

    await expect(iniciarSesion("admin", "clave-de-prueba")).resolves.toEqual({
      token: "token-de-prueba",
      usuario: "admin",
      rol: "ADMIN"
    });

    expect(apiFetch).toHaveBeenCalledWith("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: "admin", password: "clave-de-prueba" })
    });
  });
});
