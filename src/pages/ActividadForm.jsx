import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscarActividad, crearActividad,
  actualizarActividad } from "../services/actividadService";

const vacia = { nombre: "", descripcion: "", precio: 0,
  cupos: 0, categoria: "" };

export default function ActividadForm() {
  const [form, setForm] = useState(vacia);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) buscarActividad(id).then(setForm).catch(e => setError(e.message));
  }, [id]);

  function cambiar(e) {
    const { name, value } = e.target;
    setForm(actual => ({ ...actual, [name]: value }));
  }

  async function enviar(e) {
    e.preventDefault(); setGuardando(true); setError("");
    const datos = { ...form, precio: Number(form.precio), cupos: Number(form.cupos) };
    try {
      if (id) await actualizarActividad(id, datos);
      else await crearActividad(datos);
      navigate("/admin/actividades");
    } catch (e) { setError(e.message); }
    finally { setGuardando(false); }
  }

  return (
    <form onSubmit={enviar} className="container py-4">
      <h1>{id ? "Editar" : "Nueva"} actividad</h1>
      {error && <p role="alert">{error}</p>}
      <label>Nombre<input name="nombre" value={form.nombre}
        onChange={cambiar} required maxLength="100" /></label>
      <label>Descripción<textarea name="descripcion" value={form.descripcion}
        onChange={cambiar} required maxLength="500" /></label>
      <label>Precio<input name="precio" type="number" min="0"
        value={form.precio} onChange={cambiar} required /></label>
      <label>Cupos<input name="cupos" type="number" min="0" step="1"
        value={form.cupos} onChange={cambiar} required /></label>
      <label>Categoría<input name="categoria" value={form.categoria}
        onChange={cambiar} required maxLength="60" /></label>
      <button disabled={guardando}>{guardando ? "Guardando..." : "Guardar"}</button>
    </form>
  );
}
