import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Col, Container, Row, CardGroup } from "react-bootstrap";
import "./css/site.css";
import GameDetail from "./GameDetail";

const CardView = () => {
  const [gameId, setGameId] = useState("");
  // Modal
  const [showGameDetailModal, setShowGameDetailModal] = useState(false);

  const openGameDetailModal = (id) =>{
    setGameId(id)
    setShowGameDetailModal(true);
  }
  const closeGameDetailModal =  () =>{
    setGameId("")
    setShowGameDetailModal(false);
  }
  const [game, setGame] = useState([]);

  const getGames = async () => {
    const url = sessionStorage.getItem("url") + "games.php";
    const formData = new FormData();
    formData.append("operation", "getGames");
    try{
      const res = await axios({url: url, data: formData,method: "post"})
      if (res.data !== 0) {
        setGame(res.data);
      }
    }catch(err){
      alert("Card View getGames There was an unexpected error occurred: " + err);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <>
      <Container className="text-center">
        <Row>
          {Array.isArray(game) &&
            game.map((games, index) => (
              <Col key={index} md={3} xs={6}>
                <CardGroup className="justify-content-center">
                  <Card onClick={() => openGameDetailModal(games.game_id)} className="mb-5 d-flex flex-column" style={{ border: '2px solid black' }}>
                    <Card.Img
                      className="mx-auto icon-image"
                      variant="top"
                      src={
                        process.env.PUBLIC_URL +
                        "/images/gameIcon/" +
                        games.game_icon
                      } />
                  </Card>
                </CardGroup>
              </Col>
            ))}
        </Row>
      </Container>
      <GameDetail show={showGameDetailModal} onHide={closeGameDetailModal} selectedGameId={gameId}/>
    </>
  );
};

export default CardView;