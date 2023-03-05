import axios from "axios";
import { useState} from "react";
import { Form, Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertScript from "./AlertScript";

const AddNickName = () => {
	const [nickName, setNickName] = useState("");
	const navigateTo = useNavigate();
	//for alert
	const [showAlert, setShowAlert] = useState(false);
	const [alertVariant, setAlertVariant] = useState("");
	const [alertMessage, setAlertMessage] = useState("");


	function getAlert(variantAlert, messageAlert){
		setShowAlert(true);
		setAlertVariant(variantAlert);
		setAlertMessage(messageAlert);
	}
	const addNickName = () =>{
		const url = sessionStorage.getItem("url") + "students.php";
		const schoolId = sessionStorage.getItem("schoolId")
		const jsonData = {nickName: nickName, schoolId : schoolId}
		console.log(JSON.stringify(jsonData))
		const formData = new FormData();
		formData.append("json", JSON.stringify(jsonData));
		formData.append("operation", "addNickName");

		axios({url: url, data: formData, method: "post"})
		.then((res) =>{
			console.log(res.data)
			if(res.data !== 0){
				sessionStorage.setItem("nickName", nickName);
				
				getAlert("success", "Success!");
				setTimeout(() => {
					console.log(sessionStorage.getItem("nickName"));
					navigateTo("/");
				}, 2000);
			}
		})
		.catch((err)=>{
			getAlert("danger", "There was an unexpected error: " + err);
		})

	}	
	const handleSubmit = () =>{
		if(nickName === ""){
			getAlert("danger", "Please enter a valid nickname to proceed");
		}else{
			addNickName();
		}
	}
  return ( 
		<>
      <Container fluid="md" className="centered">
        <Card className="card-thin">
          <Card.Body className="card-body">
            <h2 className="text-center mt-4">Nickname</h2>   
				<AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
            <Form className="text-center">
              <Form.Group>
                <Form.Control
                  className="form-control"
                  type="text"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                  autoFocus
                  required
                />
              </Form.Group>
              <Button className="button-large mt-3 btn-success" onClick={handleSubmit}>Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>		
		</>
	);
}
 
export default AddNickName;