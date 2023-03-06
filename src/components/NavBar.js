import { Navbar } from "react-bootstrap";
import "./css/site.css";

function NavBar() {


  return (
    <Navbar className="nav-background" expand="lg" text="light">
      <Navbar.Brand className="brand">IT Days 2023 </Navbar.Brand>
    </Navbar>
  );
}

export default NavBar;
