import FormularioActividad from "./FormularioActividad";

function AdminActividades({ actividades, onCrear, onEliminar }) {
  return (
    <main className="container py-4">
      <h1>Administración de actividades</h1>

      <FormularioActividad onGuardar={onCrear} />

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
                  <button
                    className="btn btn-danger"
                    onClick={() => onEliminar(actividad.id)}
                  >
                    Eliminar
                  </button>
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
