import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Card, ListGroup,Image } from "react-bootstrap";
import RateGame from "./RateGame";
import "./css/site.css"


const GameDetail = () => {

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
    const navigateTo = useNavigate(); 
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
                const res = await axios({url: url,data: formData,method: "post",timeout: 1000})
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
                    console.log("res.data= "+res.data)
                    console.log("gameId = "+ gameId)
                }
            }catch(err){
                alert("There was an error occured: " + err)
            }
        }
    
        if(sessionStorage.getItem("schoolId") === "" || sessionStorage.getItem("schoolId") === null){
            setIsLoggedIn(false);
        }else{
            setIsLoggedIn(true);
        }
        getDevs();
        selectGame();
        getImage();
    }, [gameId, location.state.selectedGameId])

    return ( 
        <>
            <Container className="mr-auto mt-1">
                <Button className="btn-danger"onClick={handleBack}>Back</Button> {" "}
                {isLoggedIn && (
                    <>
                        <Button className="btn-success" onClick={openRateModal}>
                            Rate Game
                        </Button>
                    </>
                )}
            </Container>
            <Card className="mt-3">
                <Card.Body>
                    <Container className="text-center">

                        <h1><b>{gameName}</b></h1><br />
                        <Image 
                            src={process.env.PUBLIC_URL + "/images/gameIcon/" + gameIcon}
                            alt={gameName + "'s Icon picture"}
                            className="icon-image mb-4"
                            fluid
                        /> 
                    </Container>
                    <p className="mt-3">{gameDescription}</p><br />

                    <Card className="card-thin w-50" fluid="true">
                        <Card.Footer><h4>Developers</h4></Card.Footer>
                        <ListGroup variant="flush">
                            {
                                dev.map((devs, index) =>(
                                    <ListGroup.Item key={index}>{devs.dev_name}</ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Card>

                    <Container className="mt-3 text-center"> 
                            {
                                image.map((images, index) =>(
                                    <Image 
                                        src={process.env.PUBLIC_URL + "/images/screenshots/" + images.img_image}
                                        className="icon-image mb-3"
                                        thumbnail 
                                        key={index}
                                        fluid
                                    />                        
                                ))
                            }
                    </Container>

                    <Container className="text-center">
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