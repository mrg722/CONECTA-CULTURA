function MisInscripciones({ inscripciones, onEliminar }) {
  return (
    <section>
      <h2 className="mb-4">Mis inscripciones</h2>

      {inscripciones.length === 0 ? (
        <p>No hay actividades inscritas.</p>
      ) : (
        <div className="row g-4">
          {inscripciones.map((actividad) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={actividad.id}
            >
              <article className="card h-100">
                <div className="card-body">
                  <h3 className="h5">
                    {actividad.nombre}
                  </h3>

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
      )}
    </section>
  );
}

export default MisInscripciones;