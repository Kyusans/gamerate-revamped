import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import AdminLogin from "./admin/AdminLogin";
import AlertScript from "./AlertScript";
import "./css/site.css";

const Signup = (props) => {
	const {show, onHide} = props;
	const [schoolId, setSchoolId] = useState("");
	const [fullName, setFullName] = useState("");
	const [nickName, setNickName] = useState("");
	const [course, setCourse] = useState("");
	const [validated, setValidated] = useState(false);
	//for alert
	const [showAlert, setShowAlert] = useState(false);
	const [alertVariant, setAlertVariant] = useState("");
	const [alertMessage, setAlertMessage] = useState("");
	const courseList = ['ABM', 'ABM-HT', 'BACOM', 'BECED', 'BEED', 'BSA', 'BSAR', 'BSBA-FM', 'BSBA-MM', 'BSCE', 'BSCPE', 'BSCRIM', 'BSED-EN', 'BSED-FIL', 'BSED-MATH', 'BSEE', 'BSHM', 'BSHRM', 'BSIT', 'BSMA', 'BSME', 'BSMLS', 'BSN', 'BSPHARMA', 'BSTM', 'CTEACH', 'ELEM', 'ETEEAP', 'GAS', 'GAS-CRI', 'GAS-EDU', 'GAS-IT', 'HS', 'HUMSS', 'MAEDA', 'MAEED', 'MASE', 'MATSS', 'MGM', 'MSCRIM', 'PHDEDAS', 'STEM', 'STEM-HEALTH', 'TVL', 'TVL-EIM', 'TVL-EPAS', 'TVL-HOSPITALITY', 'TVL-MACH', 'TVL-PROGRAMMING', 'TVL-SMAW', 'TVL-TOURISM'];
	
	const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
    const openAdminLoginModal = () =>{
        setShowAdminLoginModal(true);
    }
    const closeAdminLoginModal =  () =>{
        setShowAdminLoginModal(false);
        handleHide();
    }
	function getAlert(variantAlert, messageAlert){
		setShowAlert(true);
		setAlertVariant(variantAlert);
		setAlertMessage(messageAlert);
 	}

	const signup = () => {
		const url = sessionStorage.getItem("url") + "students.php";
		const jsonData = {schoolId: schoolId, name: fullName, course: course, nickName: nickName}
		const formData = new FormData();

		formData.append("operation", "register");
		formData.append("json", JSON.stringify(jsonData));

		axios({
			url: url,
			data: formData,
			method: "post"
		})
		.then((res) => {
			if(res.data === -1){
				getAlert("danger","The Id you have entered has already been registered in our system.")
				setSchoolId("");
			}else if(res.data !== 0){
				getAlert("success", "Success!");
				setTimeout(() => {
					handleHide();
				}, 2000)
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
			signup();
			e.preventDefault();
			e.stopPropagation();
		}
		setValidated(true);
	}
	const handleCourseName = (e) =>{
		setCourse(e.target.value);
	}

	function handleHide(){
		setSchoolId("");
		setFullName("");
		setNickName("");
		setCourse("");
		setValidated(false);
		setShowAlert(false);
		onHide();
	}

	return ( 
		<>
			<Modal show={show} onHide={onHide} fullscreen={true}>
				<Modal.Header>
					<Container>
						<Button variant="outline-danger" onClick={handleHide} style={{ width: "75px" }}><FontAwesomeIcon icon={faArrowLeft} /></Button>
					</Container>
				</Modal.Header>
				<Modal.Body>

					<Container className="text-end">
						<button className="link-button small-button" onClick={openAdminLoginModal}></button>
					</Container>
					<Container fluid="md" className="centered">
						<Card className="card-thin" border="success" bg="light">
							<Card.Body className="card-body">
								<h2 className="text-center mt-4 mb-4">Signup</h2>
								<Container className="text-center">
									<AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
								</Container>
								
								<Form noValidate validated={validated} className="text-center" onSubmit={formValidation}>
									<Form.Group className="mt-2 w-75 margin-auto">
										<Form.Select aria-label="Default select example" onChange={handleCourseName} required defaultValue="" >
											<option value="" disabled>Select course</option>
											{courseList.map((item, index) =>(
											<option value={item} key={index}>{item}</option>
											))}
										</Form.Select>
										<Form.Control.Feedback type="invalid">
											Select course
										</Form.Control.Feedback>
									</Form.Group>

									<Form.Group>
										<FloatingLabel className="fatter-text mt-3 centered-label" label="School Id">
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

									<Form.Group>
										<FloatingLabel className="fatter-text mt-3 centered-label" label="Full Name">
											<Form.Control
													className="form-control"
													type="text"
													placeholder="LAST NAME, FIRST NAME MIDDLE NAME"
													value={fullName}
													onChange={(e) => setFullName(e.target.value)}
													required
											/>
											<Form.Control.Feedback type="invalid">
												This field is required
											</Form.Control.Feedback>
										</FloatingLabel>
									</Form.Group>

									<Form.Group>
										<FloatingLabel className="fatter-text mt-3 centered-label" label="Nickname">
											<Form.Control
													className="form-control"
													type="text"
													placeholder="Nickname"
													value={nickName}
													onChange={(e) => setNickName(e.target.value)}
													required
											/>
											<Form.Control.Feedback type="invalid">
												This field is required
											</Form.Control.Feedback>
										</FloatingLabel>
									</Form.Group>
									
									<Button type="submit" variant="outline-success" className="button-large mt-4 btn-lg big-height"><div className="text-small">Submit</div></Button>
								</Form>
							</Card.Body>
							</Card>
					</Container>
				</Modal.Body>
			</Modal>
			<AdminLogin show={showAdminLoginModal} onHide={closeAdminLoginModal} />
		</>
	);
}
 
export default Signup;