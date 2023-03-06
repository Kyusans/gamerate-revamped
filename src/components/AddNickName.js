import axios from "axios";
import { useState} from "react";
import { Form, Card, Button, Container, Modal } from "react-bootstrap";
import AlertScript from "./AlertScript";

const AddNickName = (props) => {
	const {show, onHide} = props;
	const [nickName, setNickName] = useState("");
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
		const formData = new FormData();
		formData.append("json", JSON.stringify(jsonData));
		formData.append("operation", "addNickName");

		axios({url: url, data: formData, method: "post"})
		.then((res) =>{
			if(res.data !== 0){
				sessionStorage.setItem("nickName", nickName);
				localStorage.setItem("isLoggedIn", "A");
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
		if(nickName === ""){
			getAlert("danger", "Please enter a valid nickname to proceed");
		}else if(sessionStorage.getItem("nickName") === "0"){
			addNickName();
		}else{
			getAlert("danger", "You already have a nickname");
			setTimeout(() => {
				handleHide();
			}, 2000);
		}
	}
	function handleHide(){
		setNickName("");
		setShowAlert(false);
		onHide();
	}
  return ( 
		<>	
			<Modal show={show} onHide={onHide} fullscreen={true}>
				<Modal.Body >
					<Container fluid="md" className="centered">
						<Card className="card-thin">
						<Card.Body className="card-body">
							<h2 className="text-center mt-4">Enter nickname</h2>   
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
				</Modal.Body>
			</Modal>		
		</>
	);
}
 
export default AddNickName;