import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Container, Button, Card, ListGroup, Image, Carousel, Modal } from "react-bootstrap";
import RateGame from "./RateGame";
import "./css/site.css"
import Login from "./Login";

const GameDetail = (props) => {
    const {show, onHide, selectedGameId} = props;
    const [gameName, setGameName] = useState("");
    const [gameDescription, setGameDescription] = useState("");
    const [gameIcon, setGameIcon] = useState("");
    const [image, setImage] = useState([]);
    const [dev, setDev] = useState([]);
    const [isLoggedIn , setIsLoggedIn] = useState(false);

    // Modal
    const [showRateModal, setShowRateModal] = useState(false);
    const openRateModal = () =>{
        setShowRateModal(true);
    }
    const closeRateModal =  () =>{
        setShowRateModal(false);
    }

    const [showLoginModal, setShowLoginModal] = useState(false);
    const openLoginModal = () =>{
        setShowLoginModal(true);
    }
    const closeLoginModal =  () =>{
        if(localStorage.getItem("isLoggedIn") === "1"){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }
        setShowLoginModal(false);
    }
    
    function handleHide(){
        setGameName("");
        setGameDescription("");
        setGameIcon("");
        setImage([]);
        setDev([]);
        onHide();  
    }

    useEffect(() => {
        console.log("isLoggedin: " + localStorage.getItem("isLoggedIn"))
        
        const getDevs = async () =>{
            console.log("selectedGameId " + selectedGameId)
            const gameId = selectedGameId;
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
            const gameId = selectedGameId;
            const jsonData = {gameId: gameId}
            const formData = new FormData();
            formData.append("operation", "selectGame");
            formData.append("json", JSON.stringify(jsonData));
            try{
                const res = await axios({url: url,data: formData,method: "post"})
                if(res.data !== 0){
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
            const gameId = selectedGameId;
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
        getDevs();
        selectGame();
        getImage();

    }, [selectedGameId])

    return ( 
        <>
            <Modal show={show} onHide={onHide} fullscreen={true}>
                <Modal.Header>
                    <Container className="mt-3 d-flex justify-content-between">
                        <Button variant="outline-danger" onClick={() => handleHide()} style={{ width: "75px" }}><FontAwesomeIcon icon={faArrowLeft} /> </Button>
                        {
                           isLoggedIn ? <Button variant="outline-success" onClick={openRateModal}>Rate Game</Button>
                            :
                            <Button variant="outline-success" onClick={openLoginModal}>Login first to rate game</Button>
                        }
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    
                        <Container className="text-center mt-3" style={{ maxWidth: "600px" }}>

                            <h1><b>{gameName}</b></h1><br />
                            <Image 
                                src={process.env.PUBLIC_URL + "/images/gameIcon/" + gameIcon}
                                alt={gameName + "'s Icon picture"}
                                className="minimum-height mb-4 border-1"
                                fluid
                            /> 
                    </Container>

                    <Card className="mt-3 card-thin" bg="success text-white" border="dark">
                            <Card.Body>
                                <p>{gameDescription}</p>
                            </Card.Body>
                    </Card>
                    <Card className="card-thin mt-3" border="dark">
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
                    <RateGame show={showRateModal} onHide={closeRateModal} gameId={selectedGameId} />
                    <Login show={showLoginModal} onHide={closeLoginModal} />
                </Modal.Body>
            </Modal>
        </>
    );
}
 
export default GameDetail;