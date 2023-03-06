import axios from "axios";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useState } from "react";
import AlertScript from "../AlertScript";
import "../css/site.css";

const AdminSettings = () => {
  //for alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  function getAlert(variantAlert, messageAlert, status = ""){
    setShowAlert(true);
    setAlertVariant(variantAlert);
    setAlertMessage(messageAlert);
  }

  const setRating = (status) =>{
    const url = sessionStorage.getItem("url") + "settings.php";
    const jsonData = {status: status}
    const formData = new FormData();
    formData.append("operation", "setRatingStatus");
    formData.append("json", JSON.stringify(jsonData));

    axios({url: url, data: formData, method:"post"})
    .then(res =>{
      console.log("res", res.data)
      if(res.data !== 0){
        if(status === 1){
					getAlert("success", "Success! status is now: 1");
				}else{
					getAlert("success", "Success! status is now: 0");
				}
        setTimeout(() => {
          setShowAlert(false)
        },3000)
      }
    }).catch(err =>{
      getAlert("danger", "There was an unexpected error occured: " + err);
    })
  }

	const setReveal = (status) =>{
		const url = sessionStorage.getItem("url") + "settings.php";
    const jsonData = {status: status}
    const formData = new FormData();
    formData.append("operation", "setRevealStatus");
    formData.append("json", JSON.stringify(jsonData));
		console.log("json", JSON.stringify(jsonData))
    axios({url: url, data: formData, method:"post"})
    .then(res =>{
      console.log("res", res.data)
      if(res.data !== 0){
        if(status === 1){
					getAlert("success", "Success! reveal status is now: 1");
				}else{
					getAlert("success", "Success! reveal status is now: 0");
				}
        setTimeout(() => {
          setShowAlert(false)
        },3000)
      }
    }).catch(err =>{
      getAlert("danger", "There was an unexpected error occured: " + err);
    })
	}

  return ( 
    <>
      <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
      <Card className="small-card mt-5" bg="dark">
        <Card.Body className="text-center">
          <Row className="mb-5">
            <Col><Button onClick={() => setRating(1)}>Let students rate</Button>{" "}<Button className="btn-danger" onClick={() => setRating(0)}>Stop Rate</Button></Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={() => setReveal(1)}>Reveal game name</Button> {" "} <Button className="btn-danger" onClick={() => setReveal(0)}>Unreveal game name</Button> 
            </Col>
          </Row>
          
        </Card.Body>
      </Card>
    </> 
  );
}
 
export default AdminSettings;