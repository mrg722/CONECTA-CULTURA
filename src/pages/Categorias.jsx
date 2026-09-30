function Categorias({ actividades }) {
  const categorias = [
    ...new Set(actividades.map((actividad) => actividad.categoria))
  ];

  return (
    <main className="container py-4">
      <h1>Categorías</h1>

      <ul>
        {categorias.map((categoria) => (
          <li key={categoria}>{categoria}</li>
        ))}
      </ul>
    </main>
  );
}

export default Categorias;
