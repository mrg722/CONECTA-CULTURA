import { Link } from "react-router-dom";

function NoEncontrada() {
  return (
    <main className="container py-4">
      <h1>Página no encontrada</h1>
      <p>La dirección solicitada no corresponde a una vista disponible.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default NoEncontrada;
