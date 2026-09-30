import MisInscripciones from "../components/MisInscripciones";

function Inscripciones({ inscripciones, onEliminar }) {
  return (
    <main className="container py-4">
      <MisInscripciones
        inscripciones={inscripciones}
        onEliminar={onEliminar}
      />
    </main>
  );
}

export default Inscripciones;
