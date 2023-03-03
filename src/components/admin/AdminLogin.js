import axios from "axios";
import { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertScript from "../AlertScript";

const AdminLogin = () => {

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
    
    const navigateTo = useNavigate();

    const login = () =>{
        const url = "http://localhost/gamerate/admin.php";

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
                sessionStorage.setItem("schoolId", res.data.stud_schoolId);
                getAlert("success", "Success!");
                setShowInvalid(false);
                setTimeout(() => {navigateTo("/admin/dashboard")}, 2000)
                console.log(res.data)
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
            <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
            <Form className="text-center">
                <Form.Group>
                    <FloatingLabel className="fatter-text mt-4 centered-label" label="Admin Id">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Admin Id"
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
        </>
    );
}
 
export default AdminLogin;