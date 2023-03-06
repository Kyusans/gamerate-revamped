import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertScript from "../AlertScript";
import "../css/site.css";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inactiveStudents, setInactiveStudents] = useState([]);

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

  useEffect(() =>{
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
    
    if(sessionStorage.getItem("isAdminLoggined") !== "1"){
      getAlert("danger", "wait! you're not admin!")
      setTimeout(() => {
        navigateTo("/");
      }, 2000);
    }else{
      setIsLoggedIn(true);
      getInactiveStudents();
      const intervalId = setInterval(getInactiveStudents, 5000);
      return () => clearInterval(intervalId);
    }
  },[navigateTo])

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

  return (
    <>
      {!isLoggedIn ? (
        <AlertScript show={showAlert} variant={alertVariant} message={alertMessage}/>
      ) : (
        <>
          <AlertScript show={showAlert} variant={alertVariant} message={alertMessage}/>
          <Table bordered striped responsive variant="dark" className="mt-3 text-center w-75 margin-auto">
            <thead>
              <tr>
                <th>School Id</th>
                <th>Name</th>
                <th>Course</th>
                <th>Nickname</th>
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
                    <td>{item.stud_nickName}</td>
                    <td><Button onClick={() => approveStudent(item.stud_id)}>Approve</Button></td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </>
  )}
</>

  );
};

export default AdminDashboard;
