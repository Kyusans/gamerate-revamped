import { useState, useEffect } from "react";
import Login from "./Login";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./css/site.css";

function NavBar() {
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
    console.log("logged in: " + localStorage.getItem("isLoggedIn"));
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <>
      <Navbar className="nav-background" expand="lg" text="light">
        <Container>
          <Navbar.Brand href="#home">IT Days 2023</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav "/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-75">
              <NavDropdown title={<span>Account</span>}>
                <NavDropdown.Item onClick={handleDropdown}>
                  {isLoggedIn ? "Signout" : "Login"}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Login show={showLoginModal} onHide={closeLoginModal} />
    </>
  );
}

export default NavBar;
