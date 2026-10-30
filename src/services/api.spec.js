import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "./api";

const BASE = "http://localhost:8080/api";

function respuesta({ ok = true, status = 200, cuerpo = null }) {
  return {
    ok,
    status,
    json: vi.fn().mockResolvedValue(cuerpo)
  };
}

beforeEach(() => {
  sessionStorage.clear();
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("apiFetch", () => {
  it("consulta la API sin encabezado Authorization cuando no hay token", async () => {
    fetch.mockResolvedValue(respuesta({ cuerpo: [] }));

    await expect(apiFetch("/actividades")).resolves.toEqual([]);

    const [url, opciones] = fetch.mock.calls[0];
    expect(url).toBe(`${BASE}/actividades`);
    expect(opciones.headers).toEqual({ "Content-Type": "application/json" });
  });

  it("agrega el token como Bearer cuando la sesión lo guardó", async () => {
    sessionStorage.setItem("token", "token-de-prueba");
    fetch.mockResolvedValue(respuesta({ cuerpo: { id: 1 } }));

    await apiFetch("/actividades/1");

    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(
      "Bearer token-de-prueba"
    );
  });

  it("conserva el método, el cuerpo y los encabezados recibidos", async () => {
    fetch.mockResolvedValue(respuesta({ status: 201, cuerpo: { id: 1 } }));

    await apiFetch("/actividades", {
      method: "POST",
      body: "{}",
      headers: { "X-Prueba": "1" }
    });

    const [, opciones] = fetch.mock.calls[0];
    expect(opciones.method).toBe("POST");
    expect(opciones.body).toBe("{}");
    expect(opciones.headers["X-Prueba"]).toBe("1");
  });

  it("devuelve null cuando la respuesta es 204 sin cuerpo", async () => {
    const sinContenido = respuesta({ status: 204 });
    fetch.mockResolvedValue(sinContenido);

    await expect(apiFetch("/actividades/1", { method: "DELETE" })).resolves.toBeNull();
    expect(sinContenido.json).not.toHaveBeenCalled();
  });

  it("lanza un error con el código cuando la API rechaza la solicitud", async () => {
    fetch.mockResolvedValue(respuesta({ ok: false, status: 403 }));

    await expect(apiFetch("/actividades", { method: "POST" })).rejects.toThrow(
      "Solicitud rechazada: 403"
    );
  });
});
