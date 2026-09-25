function TarjetaActividad({ actividad, onInscribir }) {
  return (
    <article className="card h-100">
      <div className="card-body">
        <h2 className="h5">{actividad.nombre}</h2>
        <p>{actividad.categoria}</p>
        <p>Cupos: {actividad.cupos}</p>
        {actividad.cupos > 0 && actividad.cupos <= 5 && (
          <p className="text-danger fw-bold">¡Últimos cupos!</p>
        )}
        <button
          className="btn btn-primary"
          onClick={() => onInscribir(actividad)}
          disabled={actividad.cupos === 0}
        >
          Inscribirme
        </button>
      </div>
    </article>
  );
}

export default TarjetaActividad;

