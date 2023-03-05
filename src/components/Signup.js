import axios from "axios";
import { useState } from "react";
import { Button, Card, Container, Dropdown, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertScript from "./AlertScript";

const Signup = () => {
	  //for alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
	const [schoolId, setSchoolId] = useState("");
	const [validated, setValidated] = useState(false);
	const navigateTo = useNavigate();
	const courseList = ['ABM', 'ABM-HT', 'BACOM', 'BECED', 'BEED', 'BSA', 'BSAR', 'BSBA-FM', 'BSBA-MM', 'BSCE', 'BSCPE', 'BSCRIM', 'BSED-EN', 'BSED-FIL', 'BSED-MATH', 'BSEE', 'BSHM', 'BSHRM', 'BSIT', 'BSMA', 'BSME', 'BSMLS', 'BSN', 'BSPHARMA', 'BSTM', 'CTEACH', 'ELEM', 'ETEEAP', 'GAS', 'GAS-CRI', 'GAS-EDU', 'GAS-IT', 'HS', 'HUMSS', 'MAEDA', 'MAEED', 'MASE', 'MATSS', 'MGM', 'MSCRIM', 'PHDEDAS', 'STEM', 'STEM-HEALTH', 'TVL', 'TVL-EIM', 'TVL-EPAS', 'TVL-HOSPITALITY', 'TVL-MACH', 'TVL-PROGRAMMING', 'TVL-SMAW', 'TVL-TOURISM'];

	function getAlert(variantAlert, messageAlert){
    setShowAlert(true);
    setAlertVariant(variantAlert);
    setAlertMessage(messageAlert);
 	}

	const signup = () => {
	const url = sessionStorage.getItem("url") + "students.php";

	const jsonData = {
		schoolId: schoolId,
	}

	const formData = new FormData();

	formData.append("operation", "login");
	formData.append("json", JSON.stringify(jsonData));

	axios({
		url: url,
		data: formData,
		method: "post"
	})

	.then((res) => {
		if(res.data !== 0){
			getAlert("success", "Success!");
			setTimeout(() => {navigateTo("/login")}, 2000)
	}
	})
	.catch((err) =>{
		getAlert("danger","There was an error occured: " + err);
	})
	}
	const formValidation = (e) =>{
		const form = e.currentTarget;

		if(form.checkValidity() === false){
			e.preventDefault();
			e.stopPropagation();
		}else{
			alert("Signup");
			e.preventDefault();
			e.stopPropagation();
		}
		setValidated(true);
	}
	return ( 
		<>
			<Container fluid="md" className="centered">
				<Card className="card-thin">
					<Card.Body className="card-body">
						<h2 className="text-center mt-4">Signup</h2>
						<Container className="text-center">
							<AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
						</Container>
						
						<Form noValidate validated={validated} className="text-center" onSubmit={formValidation}>
							<Form.Group>
								<FloatingLabel className="fatter-text mt-4 centered-label" label="School Id">
									<Form.Control
											className="form-control"
											type="text"
											placeholder="School Id"
											value={schoolId}
											onChange={(e) => setSchoolId(e.target.value)}
											required
									/>
									<Form.Control.Feedback type="invalid">
										This field is required
									</Form.Control.Feedback>
								</FloatingLabel>
							</Form.Group>
							<Form.Group controlId="formGroupDropdown">
								<Form.Label>Choose a course:</Form.Label>
								<Dropdown>
									<Dropdown.Toggle variant="success" id="dropdown-basic">
										Select a course
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{courseList.map((item, index) => (
											<Dropdown.Item key={index} href={`#${item}`}>
												{item}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								</Dropdown>
							</Form.Group>
								<Button type="submit" className="button-large mt-3 btn-lg big-height btn-success"><div className="text-small">Submit</div></Button>
								<hr />
								<p className="mt-3 text-center">Already have an account?<button className="link-button" onClick={() => navigateTo("/login")}>Login</button> </p>
						</Form>
					</Card.Body>
					</Card>
			</Container>
		</>
	);
}
 
export default Signup;