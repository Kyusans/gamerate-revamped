import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import RateGame from "./RateGame";


const GameDetail = () => {

    const [gameId, setGameId] = useState("");
    const [gameName, setGameName] = useState("No game selected");
    const [gameDescription, setGameDescription] = useState("");

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
        }
    })

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
            }
        })

        .catch((err) =>{
            alert("There was an error occured: " + err)
        })
    }

    return ( 
        <>
            <Container className="mt-3 mr-auto">
                <Button className="btn-danger" onClick={handleBack}>Back</Button>
            </Container>
            <Container className="text-center mt-3">
                <h1>{gameName}</h1><br />
                <p>{gameDescription}</p><br />
                <Button className="btn-success button-large" onClick={openRateModal}>Rate Game</Button>
            </Container>

            <RateGame show={showRateModal} onHide={closeRateModal} gameId={gameId} />
            
        </>
     );
}
 
export default GameDetail;