import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Shoutout from "../Shoutout";
import CardView from "./CardView";
import PartialResult from "./PartialResult";
import TableView from "./TableView";

const Home = () => {

    var url = "";
    
    const [isCardView, setIsCardView] = useState(true);
    const navigateTo = useNavigate();
    const handleChangeView = () =>{
        isCardView ? setIsCardView(false) : setIsCardView(true);
    }
    url = "http://www.shareatext.com/itdays/api/";
    url = "http://localhost/itdays/api/";
    sessionStorage.setItem("url", url);

    useEffect(()=> {
        if(sessionStorage.getItem("isLoggedIn") !== "1"){
            sessionStorage.setItem("isLoggedIn", "0");
        }
    },[])

    return ( 
        
        <>
            <Container className="text-center">
                <h1>Partial Result</h1>
                <PartialResult />
                <hr />
            </Container>

            <Container>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h1>Shoutouts</h1>
                    <Button variant="outline-success" onClick={() => navigateTo("/shoutoutform")}>Create Shoutout</Button>
                </div>
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