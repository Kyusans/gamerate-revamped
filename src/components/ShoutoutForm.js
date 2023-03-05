import axios from "axios";
import { useState } from "react";
import { Form, Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertScript from "./AlertScript";
import "./css/site.css"

const ShoutoutForm = () => {
  const [shoutOut, setShoutOut] = useState("");
  //for alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigateTo = useNavigate();

  function getAlert(variantAlert, messageAlert){
    setShowAlert(true);
    setAlertVariant(variantAlert);
    setAlertMessage(messageAlert);
  }

  const addShoutOut = () =>{
    const url = sessionStorage.getItem("url") + "shoutout.php";
		const schoolId = sessionStorage.getItem("schoolId");
    const nickName = sessionStorage.getItem("nickName");
		const jsonData = {shoutOut: shoutOut, schoolId : schoolId, nickName: nickName}
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
					navigateTo("/");
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
    }else if(sessionStorage.getItem("isLoggedIn") === "1"){
      addShoutOut();
    }else{
      getAlert("danger", "You need to login first");
      setTimeout(() => {
        navigateTo("/login");
      }, 2000);
    }
  }

  return ( 
    <>
      <Container fluid="md" className="centered">
        <Card className="card-thin">
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
              <Button className="button-large mt-3 btn-lg big-height btn-success" onClick={handleSubmit}>Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
 
export default ShoutoutForm;