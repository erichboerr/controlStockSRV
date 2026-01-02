import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../common/hooks/useAuth';
import { getMenuByRol, getNavbarItemsWithIcons, getRutaPorAccion } from '../../common/helpers/menuHelpers';
import './css/NavbarCustom.css';

export default function NavbarMenu() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const categorias = getMenuByRol(auth.idRol);

 

  return (
    <Navbar expand="md" bg="dark" variant="dark" className="px-3 mt-5 custom-navbar">
      <Container fluid>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto">
            {categorias.map((cat) => {
              const subItems = getNavbarItemsWithIcons(cat, auth.idRol);
              return (
                <NavDropdown title={cat} key={cat} id={`nav-${cat}`}>
                  {subItems.map((item, index) => (
                    <NavDropdown.Item key={index} onClick={() => navigate(getRutaPorAccion(cat, item.nombre))}>
                      <i className={`bi ${item.icono} me-2`}></i>
                      {item.nombre}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}