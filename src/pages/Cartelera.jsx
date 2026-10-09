import { Col, Row } from "react-bootstrap";
import TarjetaActividad from "../components/TarjetaActividad";

function Cartelera({ actividades, onInscribir }) {
  return (
    <Row className="g-4">
      {actividades.map((actividad) => (
        <Col xs={12} md={6} lg={4} key={actividad.id}>
          <TarjetaActividad
            actividad={actividad}
            onInscribir={onInscribir}
          />
        </Col>
      ))}
    </Row>
  );
}

export default Cartelera;
