import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Modal, Table } from "react-bootstrap";

import AlertScript from "../AlertScript";
import "../css/site.css";
import AdminSettings from "./AdminSettings";

const AdminDashboard = (props) => {
  const {show, onHide} = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inactiveStudents, setInactiveStudents] = useState([]);
  
  //for alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  function getAlert(variantAlert, messageAlert){
    setShowAlert(true);
    setAlertVariant(variantAlert);
    setAlertMessage(messageAlert);
  }
  const [showAdminSettingsModal, setShowAdminSettingsModal] = useState(false);
  const openAdminSettingsModal = () =>{
    setShowAdminSettingsModal(true);
  }
  const closeAdminSettingsModal =  () =>{
    setShowAdminSettingsModal(false);
  }
  const getInactiveStudents = async () =>{
    const url = sessionStorage.getItem("url") + "admin.php";
    const formData = new FormData();
    formData.append("operation", "getInactiveStudents");
    try{
      const res = await axios({url: url, data: formData, method:"post"})
      if(res.data !== 0){
        setInactiveStudents(res.data);
        getAlert("success", "Inactive students data found!");
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      }else{
        getAlert("danger", "No data found!");
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      }
    }catch(err){
      getAlert("danger", "There was an unexpected error occured: " + err);
    }
  }

  const approveStudent = (id) =>{
    const url = sessionStorage.getItem("url") + "admin.php";
    const studId = id;
    const jsonData = {studId: studId}
    const formData = new FormData();
    formData.append("operation", "activate");
    formData.append("json", JSON.stringify(jsonData));
  
    axios({url: url, data: formData, method:"post"})
    .then(res =>{
      console.log("res", res.data)
      if(res.data !== 0){
        getAlert("success", "Student approved!")
        setTimeout(() => {
          setShowAlert(false)
        },1000)
      }
      setInactiveStudents(prevInactiveStudents => {
        return prevInactiveStudents.filter(student => student.stud_id !== studId);
      });
    }).catch(err =>{
      getAlert("danger", "There was an unexpected error occured: " + err);
    })
  }

  useEffect(() =>{   
    if(show === true){
      const getInactiveStudents = async () =>{
        const url = sessionStorage.getItem("url") + "admin.php";
        const formData = new FormData();
        formData.append("operation", "getInactiveStudents");
        try{
          const res = await axios({url: url, data: formData, method:"post"})
          if(res.data !== 0){
            setInactiveStudents(res.data);
          }
        }catch(err){
          getAlert("danger", "There was an unexpected error occured: " + err);
        }
      }
      setIsLoggedIn(true);
      getInactiveStudents();
    }

  }, [show])

  return (
    <>
      <Modal show={show} onHide={onHide} fullscreen={true}>
        <Modal.Header>            
              <Container className="d-flex justify-content-between align-items-center mt-3 mb-3">
                <Button variant="outline-danger" onClick={onHide} style={{ width: "75px" }}><FontAwesomeIcon icon={faArrowLeft} /> </Button>
                <Button variant="outline-success" onClick={getInactiveStudents}>Refresh data</Button>
                <Button variant="outline-primary" onClick={openAdminSettingsModal}>Settings</Button>
              </Container></Modal.Header>
        <Modal.Body>
          {!isLoggedIn ? (
            <AlertScript show={showAlert} variant={alertVariant} message={alertMessage}/>
          ) : (
            <>
              <Container className="w-50 text-center">
                <AlertScript show={showAlert} variant={alertVariant} message={alertMessage}/>
              </Container>
              <Table bordered striped responsive variant="dark" className="mt-3 text-center w-50 margin-auto">
                <thead>
                  <tr>
                    <th>School Id</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(inactiveStudents) &&
                    inactiveStudents.map((item, index) =>(
                      <tr key={index}>
                        <td>{item.stud_schoolId}</td>
                        <td>{item.stud_name}</td>
                        <td>{item.stud_course}</td>
                        <td><Button onClick={() => approveStudent(item.stud_id)}>Approve</Button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
          </>)}
        </Modal.Body>
      </Modal>
      <AdminSettings show={showAdminSettingsModal} onHide={closeAdminSettingsModal}/>
    </>
  );
};

export default AdminDashboard;
