import { useState } from "react";
import { Button, Container } from "react-bootstrap";

import CardView from "./CardView";
import PartialResult from "./PartialResult";
import Shoutout from "./Shoutout";
import TableView from "./TableView";

const Home = () => {
    var url = "";
    
    const [isCardView, setIsCardView] = useState(true);

    const handleChangeView = () =>{
        isCardView ? setIsCardView(false) : setIsCardView(true);
    }
    url = "http://www.shareatext.com/itdays/api/";
    url = "http://localhost/itdays/api/";
    sessionStorage.setItem("url", url);
    function handleSignout(){
        localStorage.setItem("isLoggedIn", "0");
    }
    return (    
        <>
            <Button variant="outline-danger" onClick={handleSignout}>Signout</Button>
            <Container className="mt-3">     
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