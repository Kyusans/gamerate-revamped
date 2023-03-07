import axios from "axios";
import { useState } from "react";
import { Form, FloatingLabel, Button, Modal } from "react-bootstrap";
import AlertScript from "../AlertScript";
import AdminDashboard from "./AdminDashboard";

const AdminLogin = (props) => {
    const {show, onHide} = props;
    const [showInvalid, setShowInvalid] = useState(false);
    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");
    //for alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    function getAlert(variantAlert, messageAlert){
        setShowAlert(true);
        setAlertVariant(variantAlert);
        setAlertMessage(messageAlert);
    }
	const [showAdminDashBoardModal, setShowAdminDashBoardModal] = useState(false);
    const openAdminDashBoardModal = () =>{
        setShowAdminDashBoardModal(true);
    }
    const closeAdminDashBoardModal =  () =>{
        setShowAdminDashBoardModal(false);
        handleHide()
    }
    const login = () =>{
        const url = sessionStorage.getItem("url") + "admin.php";
        const jsonData = {
            adminId: adminId,
            password: password
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
                localStorage.setItem("isAdminLoggined", "1");
                getAlert("success", "Welcome back admin!");
                setShowInvalid(false);
                setTimeout(() => {
                    openAdminDashBoardModal();
                    handleHide();
                }, 2000);
            }else{
                handleHide();
            }
        })

        .catch((err) =>{
            getAlert("danger","There was an error occured: " + err);
        })
    }
    function handleHide(){
        setShowAlert(false);
        setAdminId("");
        setPassword("");
        onHide()
    }
    return ( 
        <>
            <Modal show={show} onHide={onHide} fullscreen={true}>
                <Modal.Body>
                    <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
                    <Form className="text-center">
                        <Form.Group>
                            <FloatingLabel className="fatter-text mt-4 centered-label" label="Admin school Id">
                                <Form.Control
                                    className="form-control"
                                    type="password"
                                    placeholder="school id"
                                    value={adminId}
                                    onChange={(e) => setAdminId(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group>
                            <FloatingLabel className="fatter-text mt-4 centered-label" label="Password">
                                <Form.Control
                                    className="form-control"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {
                                    showInvalid &&
                                    <Form.Text className="text-danger">
                                        Wrong id or password
                                    </Form.Text>
                                }
                            </FloatingLabel>
                        </Form.Group>

                        <Button className="button-large mt-3 btn-lg big-height btn-success" onClick={login}><div className="text-small">Login</div></Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <AdminDashboard show={showAdminDashBoardModal} onHide={closeAdminDashBoardModal}/>
        </>
    );
}
 
export default AdminLogin;