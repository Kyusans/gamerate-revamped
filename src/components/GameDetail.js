import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Container, Button, Card, ListGroup, Image, Carousel } from "react-bootstrap";
import RateGame from "./RateGame";
import "./css/site.css"

const GameDetail = () => {
    const navigateTo = useNavigate();
    const [gameId, setGameId] = useState("");
    const [gameName, setGameName] = useState("");
    const [gameDescription, setGameDescription] = useState("");
    const [gameIcon, setGameIcon] = useState("");
    const [image, setImage] = useState([]);
    const [dev, setDev] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Modal
    const [showRateModal, setShowRateModal] = useState(false);
    const openRateModal = () =>{
        setShowRateModal(true);
    }
    const closeRateModal =  () =>{
        setShowRateModal(false);
    }
    //const navigateTo = useNavigate(); 
    const location = useLocation();

    const handleBack = () =>{
        navigateTo("/");
    }

    useEffect(() => {
        setGameId(location.state.selectedGameId);
        const getDevs = async () =>{
            const url = sessionStorage.getItem("url")+ "games.php";
            
            const jsonData = {gameId: gameId}
            const formData = new FormData();
            formData.append("operation", "getDevs");
            formData.append("json", JSON.stringify(jsonData));
            try {
                const res = await axios({url: url,data: formData,method: "post"})
                if(res.data !== 0){
                    setDev(res.data);
                }
            }catch(err){
                alert("There was an error occured: " + err)
            }
        }
        const selectGame = async () =>{
            const url = sessionStorage.getItem("url") + "games.php";
            
            const jsonData = {gameId: gameId}
            const formData = new FormData();
            formData.append("operation", "selectGame");
            formData.append("json", JSON.stringify(jsonData));
            try{
                const res = await axios({url: url,data: formData,method: "post"})
                if(res.data !== 0){
                    setGameId(res.data.game_id)
                    setGameName(res.data.game_name);
                    setGameDescription(res.data.game_description);
                    setGameIcon(res.data.game_icon);
                }
            }catch(err){
                alert("There was an error occured: " + err)
            }
        }
        const getImage = async () =>{
            const url = sessionStorage.getItem("url")+ "games.php";
            
            const jsonData = {gameId: gameId}
            const formData = new FormData();
            formData.append("operation", "getImage");
            formData.append("json", JSON.stringify(jsonData));
            try {
                const res = await axios({url: url,data: formData,method: "post"})

                if(res.data !== 0){
                    setImage(res.data);
                }
            }catch(err){
                alert("There was an error occured: " + err)
            }
        }

        if(sessionStorage.getItem("isLoggedIn") === "1"){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);   
        }
        getDevs();
        selectGame();
        getImage();

    }, [gameId, location.state, location.state.selectedGameId])

    return ( 
        <>
            <Container className="mt-1 d-flex justify-content-between">
                <Button className="btn-danger" onClick={handleBack} style={{ width: "75px" }}><FontAwesomeIcon icon={faArrowLeft} /> </Button>
                {
                    isLoggedIn ? (<Button className="btn-success" onClick={openRateModal}>Rate Game</Button>) 
                    :
                    (<Button className="btn-success button-large" onClick={() => navigateTo("/login")}>Login first to rate game</Button>)
                }
            </Container>
            <Container className="text-center mt-5" style={{ maxWidth: "600px" }}>

                <h1><b>{gameName}</b></h1><br />
                <Image 
                    src={process.env.PUBLIC_URL + "/images/gameIcon/" + gameIcon}
                    alt={gameName + "'s Icon picture"}
                    className="minimum-height mb-4"
                    fluid
                /> 
                <p className="mt-3">{gameDescription}</p>
            </Container>
            <Card className="small-card">
                <Card.Footer><h4>Developers</h4></Card.Footer>
                <ListGroup variant="flush">
                    {
                        dev.map((devs, index) =>(
                            <ListGroup.Item key={index}>{devs.dev_name}</ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Card>

            <Container className="mt-3 mb-5 text-center" style={{ maxWidth: "550px" }}> 
                    <Carousel>
                        {
                            image.map((images, index) =>(
                                <Carousel.Item key={index}>
                                    <Image 
                                        src={process.env.PUBLIC_URL + "/images/screenshots/" + images.img_image}
                                        className="minimum-height"
                                        rounded
                                        thumbnail
                                    />   
                                </Carousel.Item>                     
                            ))
                        }
                    </Carousel>
            </Container>
            <RateGame show={showRateModal} onHide={closeRateModal} gameId={gameId} />
        </>
    );
}
 
export default GameDetail;