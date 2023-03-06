import axios from "axios";
import { useState } from "react";
import { Form, Card, Button, Container, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AlertScript from "./AlertScript";
import "./css/site.css"
import Login from "./Login";

const ShoutoutForm = (props) => {
  const {show, onHide} = props;
  const [shoutOut, setShoutOut] = useState("");
  //for alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const openLoginModal = () =>{
    setShowLoginModal(true);
  }
  const closeLoginModal =  () =>{
    setShowLoginModal(false);
    setShowAlert(false);
  }

  function getAlert(variantAlert, messageAlert){
    setShowAlert(true);
    setAlertVariant(variantAlert);
    setAlertMessage(messageAlert);
  }

  const addShoutOut = () =>{
    const url = sessionStorage.getItem("url") + "shoutout.php";
		const schoolId = localStorage.getItem("schoolId");
    const nickName = localStorage.getItem("nickName");
		const jsonData = {shoutOut: shoutOut, nickName: nickName, schoolId : schoolId}
		console.log(JSON.stringify(jsonData))
		const formData = new FormData();
		formData.append("json", JSON.stringify(jsonData));
		formData.append("operation", "saveShoutOut");

		axios({url: url, data: formData, method: "post"})
		.then((res) =>{
			console.log(res.data)
			if(res.data !== 0){
				getAlert("success", "Success!");
				setTimeout(() => {
					handleHide();
				}, 2000);
			}
		})
		.catch((err)=>{
			getAlert("danger", "There was an unexpected error: " + err);
		})
  }

  const handleSubmit = () =>{
    if(shoutOut === ""){
      getAlert("danger", "Please enter a valid message");
    }else if(localStorage.getItem("isLoggedIn") === "A"){
      addShoutOut();
    }else{
      console.log("from shoutoutform " + localStorage.getItem("isLoggedIn"))
      getAlert("danger", "You need to login first");
      setTimeout(() => {
        openLoginModal();
      }, 1000);
    }
  }

	function handleHide(){
    setShoutOut("");
    setShowAlert(false);
    onHide();
	}
  return ( 
    <>
      <Modal show={show} onHide={onHide} fullscreen={true}>
        <Modal.Body>
          <Button variant="outline-danger" onClick={() => handleHide()} style={{ width: "75px" }}><FontAwesomeIcon icon={faArrowLeft} /></Button>
          <Container fluid="md" className="centered">
            <Card className="card-thin" bg="light" border="success">
              <Card.Body className="card-body">
                <h2 className="text-center mt-4">Shoutout</h2>   
                <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
                <Form className="text-center">
                  <Form.Group>
                  <Form.Control
                    className="form-control textarea"
                    as="textarea"
                    rows={8}
                    type="text"
                    placeholder="message"
                    value={shoutOut}
                    onChange={(e) => setShoutOut(e.target.value)}
                    autoFocus
                    required
                    maxLength={700}
                  />
                    <Form.Text className="text-muted">
                      Please enter a message of no more than 700 characters.
                    </Form.Text>
                  </Form.Group>
                  <Button className="button-large mt-3 btn-lg big-height" variant="outline-success" onClick={handleSubmit}>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </Modal.Body>
      </Modal>
      <Login show={showLoginModal} onHide={closeLoginModal} />
    </>  
  );
}
 
export default ShoutoutForm;