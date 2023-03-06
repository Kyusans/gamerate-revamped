import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, Button, Container, FloatingLabel, Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AddNickName from './AddNickName';
import AlertScript from './AlertScript';
import "./css/site.css";
import Signup from './Signup';


const Login = (props) => {
    const [schoolId, setSchoolId] = useState("");
    const [showInvalid, setShowInvalid] = useState(false);
    const {show, onHide} = props;
    //for alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    // Modal
    const [showNickNameModal, setShowNickNameModal] = useState(false);
    const openNickNameModal = () =>{
        setShowNickNameModal(true);
    }
    const closeNickNameModal =  () =>{
        setShowNickNameModal(false);
        handleHide()
    }

    const [showSignupModal, setShowSignupModal] = useState(false);
    const openSignupModal = () =>{
        setShowSignupModal(true);
        console.log("open modal")
    }
    const closeSignupModal =  () =>{
        setShowSignupModal(false);
    }

    function handleHide(){
        onHide();
        setSchoolId("");
    }

    useEffect(() =>{
        localStorage.setItem("isLoggedIn", "0")
        localStorage.setItem("schoolId", null);
        localStorage.setItem("nickName", "")
    },[])

    function getAlert(variantAlert, messageAlert){
        setShowAlert(true);
        setAlertVariant(variantAlert);
        setAlertMessage(messageAlert);
    }

    const login = () => {
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
            console.log("res data nick: " + res.data.stud_nickName)
            if(res.data.stud_active === "0"){
                getAlert("danger","Your account is pending approval")
            }else if(res.data.stud_nickName === ""){
                localStorage.setItem("schoolId", res.data.stud_schoolId);
                localStorage.setItem("nickName", "0");
                getAlert("success", "Success");
                setShowInvalid(false);
                setTimeout(() => {
                    openNickNameModal();
                }, 2000)
            }else if(res.data !== 0){
                localStorage.setItem("schoolId", res.data.stud_schoolId);
                localStorage.setItem("nickName", res.data.stud_nickName);
                localStorage.setItem("isLoggedIn", "1")
                console.log("from loggin " + localStorage.getItem("isLoggedIn"))
                getAlert("success", "Success!");
                setShowInvalid(false);
                setTimeout(() => {
                    onHide();
                }, 2000)
            }else{
                setShowInvalid(false);
                setTimeout(() => {setShowInvalid(true)}, 300)
            }
        })

        .catch((err) =>{
            getAlert("danger","There was an error occured: " + err);
        })
    }
    
    return ( 
        <>
            <Modal show={show} onHide={onHide} fullscreen={true}>
                <Modal.Body>
                    <Button variant="outline-danger" onClick={() => handleHide()} style={{ width: "75px" }}><FontAwesomeIcon icon={faArrowLeft} /></Button>
                    <Container fluid="md" className="centered">
                        <Card className="card-thin" border="success" bg="light">
                            <Card.Body className="card-body">
                                <h2 className="text-center mt-4">Login</h2>
                                <Container className="text-center">
                                    <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
                                </Container>
                                
                                <Form className="text-center">
                                    <Form.Group>
                                        <FloatingLabel className="fatter-text mt-4 centered-label" label="School Id">
                                            <Form.Control
                                                className="form-control"
                                                type="text"
                                                placeholder="School Id"
                                                value={schoolId}
                                                onChange={(e) => setSchoolId(e.target.value)}
                                            />
                                            {
                                                showInvalid &&
                                                <Form.Text className="text-danger">
                                                    Invalid id 
                                                </Form.Text>
                                            }
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Button variant="outline-success" className="button-large mt-3 btn-lg big-height" onClick={login}><div className="text-small">Login</div></Button>
                                    <div className="d-flex align-items-center mt-2 mb-2">
                                        <hr className="flex-grow-1" />
                                        <div className="px-2"><h5>or</h5></div>
                                        <hr className="flex-grow-1" />
                                    </div>
                                        <Button variant="outline-primary" onClick={openSignupModal}>Sign Up</Button>                          
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                </Modal.Body>
            </Modal>
            <AddNickName show={showNickNameModal} onHide={closeNickNameModal} />
            <Signup show={showSignupModal} onHide={closeSignupModal} />
        </>
     );
}
 
export default Login;
