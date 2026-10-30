import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { iniciarSesion } from "../services/authService";

/**
 * Estado compartido de autenticación (Guía 17).
 *
 * El token viaja en sessionStorage: sobrevive una recarga de la pestaña y se
 * descarta al cerrarla. El rol se usa solo para mejorar la navegación; la
 * barrera real sigue siendo el backend.
 */
export function AuthProvider({ children }) {
  // La restauración ocurre al inicializar el estado y no en un efecto: de lo
  // contrario el primer render vería la sesión vacía y RutaProtegida expulsaría
  // al login a quien recarga una dirección administrativa.
  const [usuario, setUsuario] = useState(() => {
    const guardado = sessionStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  async function login(username, password) {
    const sesion = await iniciarSesion(username, password);
    const autenticado = { usuario: sesion.usuario, rol: sesion.rol };

    sessionStorage.setItem("token", sesion.token);
    sessionStorage.setItem("usuario", JSON.stringify(autenticado));
    setUsuario(autenticado);

    return autenticado;
  }

  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
