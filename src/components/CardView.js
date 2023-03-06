import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Col, Container, Row, CardGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/site.css";

const CardView = () => {
  const [game, setGame] = useState([]);
  const navigateTo = useNavigate();

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
      alert("Card View There was an unexpected error occurred: " + err);
    }
  };

  const handleSelectedGame = (gameId) => {
    navigateTo("/game", { state: { selectedGameId: gameId } });
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
                  <Card onClick={() => handleSelectedGame(games.game_id)} className="mb-5 d-flex flex-column" style={{ border: '2px solid black' }}>
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
    </>
  );
};

export default CardView;