import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Alert, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Rating from "react-rating-stars-component";
import RateGame from "./RateGame";
import "./css/site.css"


const GameDetail = () => {

    const [gameId, setGameId] = useState("");
    const [gameName, setGameName] = useState("");
    const [gameDescription, setGameDescription] = useState("");
    const [gameIcon, setGameIcon] = useState("");

    const [stars, setStars] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRated, setIsRated] = useState(false);

    // Modal
    const [showRateModal, setShowRateModal] = useState(false);

    const openRateModal = () =>{
        setShowRateModal(true);
    }

    const closeRateModal =  () =>{
        setShowRateModal(false);
    }

    const navigateTo = useNavigate(); 

    const location = useLocation();

    useEffect(() =>{
        if(location.state !== null){
            selectGame();
            checkIsUserRated()
        }
    })

    useEffect(() => {
        if(sessionStorage.getItem("schoolId") === "" || sessionStorage.getItem("schoolId") === null){
            setIsLoggedIn(false);
        }else{
            setIsLoggedIn(true);
        }
    }, [])
    

    const handleBack = () =>{
        navigateTo("/");
    }

    const selectGame = () =>{
        setGameId(location.state.selectedGameId);
        const url = "http://localhost/gamerate/games.php";
        
        const jsonData = {
            gameId: gameId
        }

        const formData = new FormData();

        formData.append("operation", "selectGame");
        formData.append("json", JSON.stringify(jsonData));
        
        axios({
            url: url,
            data: formData,
            method: "post"
        })

        .then((res) =>{
            if(res.data !== 0){
                setGameId(res.data.game_id)
                setGameName(res.data.game_name);
                setGameDescription(res.data.game_description);
                setGameIcon(res.data.game_icon);
            }
        })

        .catch((err) =>{
            alert("There was an error occured: " + err)
        })
    }

    const checkIsUserRated = () =>{
        const url = "http://localhost/gamerate/games.php";
        const schoolId = sessionStorage.getItem("schoolId");
        const jsonData = {
            schoolId: schoolId,
            gameId: gameId
        }

        const formData = new FormData();

        formData.append("operation", "getStudentRate");
        formData.append("json", JSON.stringify(jsonData));

        axios({
            url: url,
            data: formData,
            method: "post"
        })

        .then((res) =>{
            if(res.data === 0){
                setIsRated(false)
            }else{
                setIsRated(true);
                setStars(res.data.rate_rating)
            }
        })

        .catch((err) =>{
            alert("There was an unexpected error: " + err);
        })
    }

    return ( 
        <>
            <Card className="mt-5">
           
                <Card.Body>
                    <Container className="mr-auto">
                        <Button className="btn-danger" onClick={handleBack}>Back</Button>
                    </Container>
                    <Container className="text-center mt-3">
                        <img 
                            src={process.env.PUBLIC_URL + "/images/gameIcon/" + gameIcon}
                            alt={gameName + "'s Icon picture"}
                        />
                        <h1>{gameName}</h1><br />
                        <p>{gameDescription}</p><br />
                        {isLoggedIn && !isRated && (
                            <>
                                <Button className="btn-success button-large" onClick={openRateModal}>
                                    Rate Game
                                </Button>
                                <div className="mt-2 text-danger">
                                    <FontAwesomeIcon icon={faExclamationTriangle} /> You can only rate <b>once</b>.
                                </div>
                            </>
                        )}
                        {isLoggedIn && isRated && (
                            <Alert variant="success mt-4 text-center">
                                <div className="rating-container">
                                    You have already rated this game 
                                    <Rating
                                        count={5}
                                        size={50}
                                        activeColor="#ffd700"
                                        value={Number(stars)}
                                        edit={false}
                                    /> 
                                </div>
                            </Alert>
                        )}
                        {!isLoggedIn && (
                            <Button className="btn-success button-large" onClick={() => navigateTo("/login")}>
                                Login first to rate game
                            </Button>
                        )}
                    </Container>
                </Card.Body>
            </Card>

            <RateGame show={showRateModal} onHide={closeRateModal} gameId={gameId} />
            
        </>
     );
}
 
export default GameDetail;