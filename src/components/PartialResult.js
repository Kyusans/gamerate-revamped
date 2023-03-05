import axios from "axios";
import { useState, useEffect } from "react";
import { Alert, Container, Table } from "react-bootstrap";

const PartialResult = () => {
    const [game, setGame] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getGames = async () => {
        const url = sessionStorage.getItem("url") + "games.php";

        const formData = new FormData();

        formData.append("operation", "getGameResult");

        try {
        const res = await axios({
            url: url,
            data: formData,
            method: "post",
        });

        if (res.data !== 0) {
            setGame(res.data);
            setIsLoading(false);
        } else {
            console.log(res.data);
        }
        } catch (err) {
        console.log("There was an unexpected error: " + err);
        }
    };

    useEffect(() => {
      getGames();
      const intervalId = setInterval(getGames, 5000);
      return () => clearInterval(intervalId); 
    }, []);

  return (
    <>
      <Container>
        {isLoading ? (
          <Alert variant="success">Getting data...</Alert>
        ) : (
          <Table bordered striped responsive variant="light" className="mt-3 text-center">
            <thead>
              <tr>
                <th className="green-header text-white">Rank</th>
                <th className="green-header text-white">Game</th>
                <th className="green-header text-white">Stars</th>
              </tr>
            </thead>
            <tbody>
              {game.map((games, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{games.game_letter}</td>
                  <td>{games.totalStars}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default PartialResult;
