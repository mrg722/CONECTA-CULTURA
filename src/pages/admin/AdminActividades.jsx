import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  eliminarActividad,
  listarActividades
} from "../../services/actividadService";

function AdminActividades() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        setError("");
        setActividades(await listarActividades());
      } catch (problema) {
        setError(problema.message);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  async function borrar(id) {
    if (!window.confirm("¿Eliminar esta actividad?")) return;
    try {
      await eliminarActividad(id);
      setActividades(actual => actual.filter(a => a.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  if (cargando) return <Spinner aria-label="Cargando actividades" />;

  return (
    <main className="container py-4">
      <h1>Administración de actividades</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Link className="btn btn-primary" to="/admin/actividades/nueva">
        Nueva actividad
      </Link>

      <section className="mt-5">
        <h2>Actividades actuales</h2>

        <div className="row g-4">
          {actividades.map((actividad) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={actividad.id}
            >
              <article className="card h-100">
                <div className="card-body">
                  <h3 className="h5">{actividad.nombre}</h3>
                  <p>{actividad.categoria}</p>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link
                      className="btn btn-outline-primary"
                      to={`/admin/actividades/${actividad.id}/editar`}
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => borrar(actividad.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AdminActividades;
