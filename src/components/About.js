import { Button, Card, Container, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./css/site.css";

const About = (props) => {
    const {show, onHide} = props;
    return ( 
        <>
        <Modal show={show} onHide={onHide} fullscreen={true}>
            <Modal.Header>     
            <Button variant="outline-danger" onClick={onHide} style={{ width: "75px" }}><FontAwesomeIcon icon={faArrowLeft} /></Button>
            </Modal.Header>
            <Modal.Body>
                <Container fluid="md" className="centered">
                    <Card className="card-thin" border="success">
                        <Card.Header className="text-center"><h2>About</h2></Card.Header>
                        <Card.Body className="text-center"><h5>Online rating app for game developers expo 2023</h5></Card.Body>
                        <Card.Footer className="text-center">Developed by Mel Macario</Card.Footer>
                    </Card>
                </Container>
            </Modal.Body>
        </Modal>       
        </>
     );
}
 
export default About;