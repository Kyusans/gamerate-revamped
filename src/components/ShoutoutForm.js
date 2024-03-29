import axios from "axios";
import { useState } from "react";
import { Form, Card, Button, Container, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AlertScript from "./AlertScript";
import "./css/site.css"
import Login from "./Login";
import { useEffect } from "react";

const ShoutoutForm = (props) => {
  const {show, onHide} = props;
  const [shoutOut, setShoutOut] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
		const formData = new FormData();
		formData.append("json", JSON.stringify(jsonData));
		formData.append("operation", "saveShoutOut");

		axios({url: url, data: formData, method: "post"})
		.then((res) =>{
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
      getAlert("danger", "You need to login first");
      setTimeout(() => {
        openLoginModal();
      }, 1000);
    }
  }

  useEffect(()=>{
    if(show){
      localStorage.getItem("isLoggedIn") === "A" ? setIsLoggedIn(true) : setIsLoggedIn(false)
    }
  }, [show])

	function handleHide(){
    setShoutOut("");
    setShowAlert(false);
    onHide();
	}
  return ( 
    <>
      <Modal show={show} onHide={onHide} fullscreen>
        <Modal.Body>
          <Container>
            <Button variant="outline-danger" onClick={() => handleHide()} style={{ width: "75px" }}><FontAwesomeIcon icon={faArrowLeft} /></Button>
          </Container>
          <Container fluid="md" className="centered">
            <Card className="card-thin" bg="light" border="success">
              <Card.Body className="card-body">
                {!isLoggedIn ? (<>
                    <Container className="text-center">
                      <h5 className="mt-4">You need to login first</h5>
                      <Button className="button-large mt-3 btn-lg big-height" variant="outline-success" onClick={openLoginModal}>Continue</Button>
                    </Container>
                  </>): (<>
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
                          <Form.Text className="text-muted ">
                            Enter a message of no more than 700 characters
                          </Form.Text>
                        </Form.Group>
                        <Button className="button-large mt-3 btn-lg big-height" variant="outline-success" onClick={handleSubmit}>Submit</Button>
                      </Form>
                  </>)  
                }

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