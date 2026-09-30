import { Link } from "react-router-dom";
import Bienvenida from "../components/Bienvenida";
import hero from "../assets/hero.png";

function Inicio() {
  return (
    <main className="container py-4">
      <Bienvenida />

      <figure className="my-4">
        <img
          src={hero}
          className="img-fluid rounded"
          alt="Conecta Cultura"
        />
      </figure>

      <Link className="btn btn-primary" to="/actividades">
        Ver actividades
      </Link>
    </main>
  );
}

export default Inicio;
