import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertScript from "../AlertScript";

const AdminDashboard = () => {
  const [status, setStatus] = useState(0);
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
    if(sessionStorage.getItem("isAdminLoggined") !== "1"){
      getAlert("danger", "wait, you're not admin!")
      setTimeout(() => {
        navigateTo("/");
      }, 2000);
    }
  },[navigateTo])

  const getRatingStatus = () =>{
    const url = sessionStorage.getItem("url") + "settings.php";

    const formData = new FormData(); 
    formData.append("operation", "getRatingStatus");
    axios({
      url: url,
      data: formData,
      method: "post"
    }).then(res =>{
     setStatus(res.data);
    }).catch(err =>{
      getAlert("danger", "There was an unexpected error: ", err)
    })
  }
  const handleStatus = () =>{
    getRatingStatus();

    if(status === 0){
      setStatus(1)
      console.log("status to 1")
    }else{
      console.log("status to 0 because status is: ", status)
      setStatus(0)
    }
    // status !== 0 ? setStatus(1) : setStatus(0);

    console.log("status now: ", status)
  }

  // const setRatingStatus = () =>{
  //   const url = sessionStorage("url") + "settings.php";
  //   const jsonData = {
  //     status: status
  //   }

  //   const formData = new FormData(); 

  //   formData.append("operation", "login");
  //   formData.append("json", JSON.stringify(jsonData));

  //   axios({
  //       url: url,
  //       data: formData,
  //       method: "post"
  //   })

  //   .then((res) => {
  //       if(res.data !== 0){

  //       }
  // })

  // .catch((err) =>{
  //     getAlert("danger","There was an error occured: " + err);
  // })
  // }
  return (
    <>
      <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />  
      <Table bordered striped responsive variant="light" className="mt-3 text-center">
        <thead>
          <tr>
            <th>School Id</th>
            <th>Actions</th>
          </tr>
        </thead>

      </Table>
      <Card  className="small-card mt-5" bg="dark">
        <Card.Body className="text-center">
          <Button onClick={handleStatus}>Let students vote</Button>{" "}
          <Button>Reveal game name</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default AdminDashboard;
