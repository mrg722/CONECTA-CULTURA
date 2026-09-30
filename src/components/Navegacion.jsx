import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navegacion() {
  return (
    <Navbar expand="md" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Conecta Cultura
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/actividades">
              Actividades
            </Nav.Link>
            <Nav.Link as={NavLink} to="/categorias">
              Categorías
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ofertas">
              Ofertas
            </Nav.Link>
            <Nav.Link as={NavLink} to="/inscripciones">
              Inscripciones
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/actividades">
              Administración
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;
