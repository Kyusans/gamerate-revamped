import { useState } from "react";
import { Button, Container } from "react-bootstrap";

import CardView from "./CardView";
import PartialResult from "./PartialResult";
import TableView from "./TableView";

const Home = () => {
    
    const [isCardView, setIsCardView] = useState(true);

    const handleChangeView = () =>{
        isCardView ? setIsCardView(false) : setIsCardView(true);
    }

    return ( 
        <>

            <Container className="text-center">
                <h1>Partial Result</h1>
                <PartialResult />
                <hr />
            </Container>

            <Container className="d-flex justify-content-between align-items-center">
                <h1>Games</h1>
                <Button onClick={handleChangeView}>Change View</Button>
            </Container>

            <Container className="mt-3">          
                {isCardView ? <CardView /> : <TableView />}
            </Container>
        </>
     );
}
 
export default Home;