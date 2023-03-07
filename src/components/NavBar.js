import { useState, useEffect } from "react";
import Login from "./Login";
import { NavLink, Nav, NavDropdown, Navbar} from "react-bootstrap";
import About from "./About";
import "./css/site.css";

function NavBar() {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const openAboutModal = () => {
    setShowAboutModal(true);
  };
  const closeAboutModal = () => {
    setShowAboutModal(false);
  };
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "A");
    setShowLoginModal(false);
  };

  function checkLoggedIn() {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "A");
  }

  function handleDropdown() {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "0");
      setTimeout(() => {
        window.location.reload();
      }, 750);
    } else {
      openLoginModal();
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <>
      <Navbar className="nav-background" expand="lg" text="light">
          <Navbar.Brand className="brand">IT Days 2023</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav "/>
          <Navbar.Collapse className="brand" id="basic-navbar-nav">
            <NavLink style={{color: "white", marginRight: "10px"}} onClick={openAboutModal}>About</NavLink>
            <Nav className="w-75"> 
              <NavDropdown title={<span>Account</span>}>
                <NavDropdown.Item onClick={handleDropdown}>
                  {isLoggedIn ? "Signout" : "Login"}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      <Login show={showLoginModal} onHide={closeLoginModal} />
      <About show={showAboutModal} onHide={closeAboutModal} />
    </>
  );
}

export default NavBar;
