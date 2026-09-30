import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const inicial = {
  nombre: "",
  categoria: "",
  cupos: ""
};

function FormularioActividad({ onGuardar }) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();

    const nuevosErrores = {};

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = "Nombre obligatorio";
    }

    if (!datos.categoria) {
      nuevosErrores.categoria = "Selecciona categoría";
    }

    if (datos.cupos === "") {
      nuevosErrores.cupos = "Cupos obligatorios";
    } else if (Number(datos.cupos) < 0) {
      nuevosErrores.cupos = "No puede ser negativo";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    onGuardar({
      ...datos,
      cupos: Number(datos.cupos)
    });

    setDatos(inicial);
    setErrores({});
  }

  return (
    <Form onSubmit={enviar} noValidate>
      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          name="nombre"
          value={datos.nombre}
          onChange={cambiar}
          isInvalid={Boolean(errores.nombre)}
        />
        <Form.Control.Feedback type="invalid">
          {errores.nombre}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="categoria">
        <Form.Label>Categoría</Form.Label>
        <Form.Select
          name="categoria"
          value={datos.categoria}
          onChange={cambiar}
          isInvalid={Boolean(errores.categoria)}
        >
          <option value="">Selecciona categoría</option>
          <option value="Música">Música</option>
          <option value="Artes visuales">Artes visuales</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Cultura">Cultura</option>
          <option value="Bienestar">Bienestar</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errores.categoria}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="cupos">
        <Form.Label>Cupos</Form.Label>
        <Form.Control
          type="number"
          name="cupos"
          value={datos.cupos}
          onChange={cambiar}
          isInvalid={Boolean(errores.cupos)}
        />
        <Form.Control.Feedback type="invalid">
          {errores.cupos}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Guardar</Button>
    </Form>
  );
}

export default FormularioActividad;
