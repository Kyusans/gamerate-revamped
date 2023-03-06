import axios from "axios";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import AlertScript from "./AlertScript";
import "./css/site.css"

const RateGame = (props) => {

    const {show, onHide, gameId } = props;
    const [star, setStar] = useState(0);

    //for alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");


    function getAlert(variantAlert, messageAlert){
        setShowAlert(true);
        setAlertVariant(variantAlert);
        setAlertMessage(messageAlert);
    }

    const handleRating = (value) => {
      setStar(value);
    };

    const addStar = () =>{
        const url = sessionStorage.getItem("url") + "games.php";

        const schoolId = localStorage.getItem("schoolId");

        const jsonData = {gameId: gameId, schoolId: schoolId, stars: star}
        const formData = new FormData();
        formData.append("operation", "addStar");
        formData.append("json", JSON.stringify(jsonData));
        axios({
            url: url,
            data: formData,
            method:"post"
        })

        .then((res) =>{
            var data = res.data;
            if(data === 3){
                getAlert("danger", "You have already rated this game.");
            }else if(res.data === 1){
                getAlert("success", `You rated ${star} stars`)
                setTimeout(() => {
                    handleHide();
                }, 1250);
            }else{
                console.log(res.data)
                getAlert("danger", "There was an unexpected error");
            }
        })

        .catch((err) =>{
            getAlert("danger", "There was an unexpected error: " + err);
        })
    }

    const checkStatus = async () =>{
			const url = sessionStorage.getItem("url") + "games.php";
			const formData = new FormData();
			formData.append("operation", "getSettings");
			try {
				const res = await axios({url: url, data: formData, method: "post"});
				const settings = res.data;
				const status = settings.find((setting) => setting.set_key === "status");
				if(status && status.set_value === "1"){
					addStar();
				}else{    
					getAlert("danger", "Rating unavailable");
				}
        }catch(err) {
          getAlert("danger","There was an unexpected error occured: ", err)
        }
    }

    function handleHide(){
        setShowAlert(false);
        setStar(0);
        onHide();
    }

    return ( 
        <>
            <Modal show={show} onHide={onHide} variant="success">
                <Modal.Header>
                    <Modal.Title>Rate this game</Modal.Title>
                </Modal.Header>

                <Modal.Body>               
                    <div className="text-center">
                        <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
                        You can rate as many games as you want <br />
                        You can rate a specific game only once <br />
                        You can not update your ratings
                        
                        <div className="rating-container">
                            <Rating
                                count={5}
                                size={50}
                                activeColor="#ffd700"
                                value={star}
                                onChange={handleRating}
                            />
                        </div>
                        
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-danger" onClick={() => handleHide()}>Close</Button>
                    <Button variant="outline-success" onClick={checkStatus}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default RateGame;