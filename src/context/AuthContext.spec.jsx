import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useAuth } from "./AuthContext";

function Consumidor() {
  useAuth();
  return null;
}

describe("useAuth", () => {
  it("exige que el componente esté dentro de AuthProvider", () => {
    const consola = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<Consumidor />)).toThrow(
      "useAuth debe usarse dentro de AuthProvider"
    );

    consola.mockRestore();
  });
});
