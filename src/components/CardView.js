import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Button, Col, Container, Row, CardGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/site.css";

const CardView = () => {
  const [game, setGame] = useState([]);
  const navigateTo = useNavigate();

  const getGames = async () => {
    const url = sessionStorage.getItem("url") + "games.php";

    const formData = new FormData();
    formData.append("operation", "getGames");
    try {
      const res = await axios({
        url: url,
        data: formData,
        method: "post"
      });
      if (res.data !== 0) {
        setGame(res.data);
      }
    } catch (err) {
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
                  <Card
                    className="small-card mb-5 d-flex flex-column"
                    border="dark"
                  >
                    <Card.Img
                      className="mx-auto icon-image"
                      variant="top"
                      src={
                        process.env.PUBLIC_URL +
                        "/images/gameIcon/" +
                        games.game_icon
                      }
                    ></Card.Img>

                    <Card.Body className="d-flex flex-column justify-content-center">
                      <Card.Title className="text-center">
                        <h6><b>{games.game_name}</b></h6>
                      </Card.Title>
                    </Card.Body>

                    <Card.Footer>
                      <Button
                        className="btn-success"
                        onClick={() => handleSelectedGame(games.game_id)}
                      >
                        See more
                      </Button>
                    </Card.Footer>
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

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Card, Button, Col, Container, Row, CardGroup, } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import "./css/site.css";
// const CardView = () => {
//     const [game, setGame] = useState([]);
//     const navigateTo = useNavigate();

//     //problem
//     const getGames = async () =>{
//         const url = sessionStorage.getItem("url") + "games.php";

//         const formData = new FormData();

//         formData.append("operation", "getGames");
//         try{
//             const res = await axios({
//                 url: url,
//                 data: formData,
//                 method: "post"
//             })
//             if(res.data !== 0){
//                 setGame(res.data);
//             }
//         }catch(err){
//             alert("There was an unexpected error occured: " + err)
//         }
//     }

//     const handleSelectedGame = (gameId) =>{
//         navigateTo("/game", {state:{selectedGameId: gameId}})
//     }
    
//     useEffect(() =>{
//         getGames();
//     }, [])
//     return ( 
//         <>
//             <Container className="text-center">
//                     {   Array.isArray(game) ?
//                             game.map((games, index) => (                
//                                 <CardGroup className="justify-content-center" key={index}>
//                                     <Card className="small-card mb-5 d-flex flex-column" border="dark">
//                                         <Card.Img className="mx-auto icon-image" variant="top" src={process.env.PUBLIC_URL + "/images/gameIcon/" + games.game_icon}></Card.Img>

//                                         <Card.Body className="d-flex flex-column justify-content-center">
//                                             <Card.Title className="text-center">{games.game_name}</Card.Title>
//                                         </Card.Body>

//                                         <Card.Footer>
//                                             <Button className="btn-succes" onClick={() => handleSelectedGame(games.game_id)}>See more</Button>
//                                         </Card.Footer>
//                                     </Card>
//                                 </CardGroup>
//                             ))
//                         :
//                             alert("ambot")
//                     }
//             </Container>
//         </>
//     );
// }
 
// export default CardView;