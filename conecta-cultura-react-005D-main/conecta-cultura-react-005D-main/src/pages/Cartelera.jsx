import TarjetaActividad from "../components/TarjetaActividad";

function Cartelera({ actividades, onInscribir }) {
  return (
    <div className="row g-4">
      {actividades.map((actividad) => (
        <div className="col-12 col-md-6 col-lg-4" key={actividad.id}>
          <TarjetaActividad
            actividad={actividad}
            onInscribir={onInscribir}
          />
        </div>
      ))}
    </div>
  );
}

export default Cartelera;
