import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";

import CardView from "./CardView";
import PartialResult from "./PartialResult";
import Shoutout from "./Shoutout";
import TableView from "./TableView";

const Home = () => {
    var url = "";
    
    const [isCardView, setIsCardView] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

    const handleChangeView = () =>{
        isCardView ? setIsCardView(false) : setIsCardView(true);
    }
    url = "http://www.shareatext.com/itdays/api/";
    url = "http://localhost/itdays/api/";
    sessionStorage.setItem("url", url);

    function handleSignout() {
        localStorage.setItem("isLoggedIn", "0");
        setIsLoggedIn("0");
        console.log("logged out na : " + localStorage.getItem("isLoggedIn"));
      }
    
      function handleLogin() {
        localStorage.setItem("isLoggedIn", "A");
        setIsLoggedIn("A");
        console.log("logged in : " + localStorage.getItem("isLoggedIn"));
      }
    
      useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn"))
      }, [isLoggedIn]);

    return (    
        <>
            <Container className="text-end mt-3">
                {isLoggedIn === "A" ? 
                <Button variant="outline-danger" onClick={handleSignout}>Signout</Button> : <Button variant="outline-success" onClick={handleLogin}>Login</Button>
                } 
            </Container>
            <Container className="mt-4">     
                <PartialResult />
                <hr />
            </Container>

            <Container>
                <Shoutout />
                <hr />
            </Container>

            <Container className="d-flex justify-content-between align-items-center">
                <h1>Games</h1>
                <Button variant="outline-success" onClick={handleChangeView}>Change View</Button>
            </Container>

            <Container className="mt-3">          
                {isCardView ? <CardView /> : <TableView />}
            </Container>

            
        </>
     );
}
 
export default Home;