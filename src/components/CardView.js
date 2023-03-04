import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Button, Col, Container, Row, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/site.css";
const CardView = () => {
    const [game, setGame] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() =>{
        getGames();
    }, [])

    const getGames = () =>{
        const url = sessionStorage.getItem("url") + "games.php";

        const formData = new FormData();

        formData.append("operation", "getGames");

        axios({
            url: url,
            data: formData,
            method: "post"
        }).then((res) =>{
            if(res.data !== 0){
                setGame(res.data);
            }
        })
    }

    const handleSelectedGame = (gameId) =>{
        navigateTo("/game", {state:{selectedGameId: gameId}})
    }
    return ( 
        <>
            <Container className="text-center">
                <Row>
                    {   Array.isArray(game) ?
                            game.map((games, index) => (
                                <Col className="justify-content-center" key={index}>
                                    <Card className="small-card mb-5">
                                        <Card.Img className="mx-auto icon-image" variant="top" src={process.env.PUBLIC_URL + "/images/gameIcon/" + games.game_icon}></Card.Img>

                                        <Card.Body>
                                            <Card.Title><b>{games.game_name}</b></Card.Title>
                                        </Card.Body>

                                        <Card.Footer>
                                            <Button className="btn-succes" onClick={() => handleSelectedGame(games.game_id)}>See more</Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))
                        :
                            alert("ambot")
                    }
                </Row> 
            </Container>
        </>
    );
}
 
export default CardView;