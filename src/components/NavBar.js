import { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./css/site.css";

function NavBar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    handleIsLoggined();
    const intervalId = setInterval(handleIsLoggined, 3000);

    return () => clearInterval(intervalId);
  },[])
  
  const handleIsLoggined = () =>{
    if(sessionStorage.getItem("isLoggedIn") === "1"){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }

  return (
    <Navbar className="nav-background" expand="lg" text="light">
      <Navbar.Brand href="/itdays/" className="brand">IT Days 2023</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/itdays/">Home</Nav.Link>
          <Nav.Link href="/itdays/about">About</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link href={"/itdays/login"}>
            {isLoggedIn ? "Signout" : "Login"}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
