import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, Button, Container, FloatingLabel, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AlertScript from './AlertScript';
import "./css/site.css";

const Login = () => {
    const [schoolId, setSchoolId] = useState("");
    const [showInvalid, setShowInvalid] = useState(false);

    //for alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const navigateTo = useNavigate();

    useEffect(() =>{
        sessionStorage.setItem("schoolId", "");
    },[])


    function getAlert(variantAlert, messageAlert){
        setShowAlert(true);
        setAlertVariant(variantAlert);
        setAlertMessage(messageAlert);
    }

    const login = () => {
        const url = "http://localhost/gamerate/students.php";

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
                sessionStorage.setItem("schoolId", res.data.stud_schoolId);
                getAlert("success", "Success!");
                setShowInvalid(false);
                setTimeout(() => {navigateTo("/")}, 2000)
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
            <Container className="text-center">
                <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
            </Container>

            <Container fluid="md" className="centered">
                <Card className="card-thin">
                    <Card.Body className="card-body">
                        
                        <h2 className="text-center mt-4">Login</h2>
                        <Form className="text-center">
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
                                    {
                                        showInvalid &&
                                        <Form.Text className="text-danger">
                                            Wrong id 
                                        </Form.Text>
                                    }
                                </FloatingLabel>
                            </Form.Group>

                            <Button className="button-large mt-3 btn-lg big-height btn-success" onClick={login}><div className="text-small">Login</div></Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
     );
}
 
export default Login;
