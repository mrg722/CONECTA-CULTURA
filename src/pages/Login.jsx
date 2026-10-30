import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Formulario de inicio de sesión al que redirige RutaProtegida (Guía 17).
 */
function Login() {
  const [credenciales, setCredenciales] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function cambiar(evento) {
    const { name, value } = evento.target;
    setCredenciales((actual) => ({ ...actual, [name]: value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    setEnviando(true);
    setError("");

    try {
      await login(credenciales.username, credenciales.password);
      navigate(location.state?.desde ?? "/", { replace: true });
    } catch (problema) {
      setError(problema.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Container as="main" className="py-4" style={{ maxWidth: "24rem" }}>
      <h1>Iniciar sesión</h1>

      {error && <Alert variant="danger" role="alert">{error}</Alert>}

      <Form onSubmit={enviar}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            name="username"
            value={credenciales.username}
            onChange={cambiar}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={credenciales.password}
            onChange={cambiar}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={enviando}>
          {enviando ? "Ingresando..." : "Ingresar"}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
