import { Card, Container } from "react-bootstrap";
import "./css/site.css";

const About = () => {
    return ( 
        <>
        <Container fluid="md" className="centered">
            <Card className="card-thin" border="success">
                <Card.Header className="text-center">About</Card.Header>
                <Card.Body><h5>Online rating app for game developers expo 2023</h5></Card.Body>
                <Card.Footer className="text-center">Developed by: Mel Macario BSIT-1</Card.Footer>
            </Card>
        </Container>
            
        </>
     );
}
 
export default About;