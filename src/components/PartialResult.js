import axios from "axios";
import { useState, useEffect } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";

const PartialResult = () => {
    const [game, setGame] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reveal, setReveal] = useState(false);

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

      if(res.data !== 0) {
        setGame(res.data);
        setIsLoading(false);
      }else{
        console.log(res.data);
      }
      } catch (err) {
      console.log("Partial Result getGame There was an unexpected error: " + err);
      }
    };

    const checkStatus = async () =>{
			const url = sessionStorage.getItem("url") + "games.php";
			const formData = new FormData();
			formData.append("operation", "getSettings");
			try {
				const res = await axios({url: url, data: formData, method: "post"});
				const settings = res.data;
				const status = settings.find((setting) => setting.set_key === "reveal");
				if(status && status.set_value === "1"){
					setReveal(true);
				}else{
          setReveal(false)
        }
        }catch(err) {
          alert("Partial Result CheckStats There was an unexpected error occured: ", err)
        }
    }
    function getAllFunction(){
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        checkStatus();
        getGames();  
      }, 1000);     
    }

    useEffect(() => {
      function getAllFunction(){
        checkStatus();
        getGames();       
      }
      getAllFunction()
    }, []);

  return (
    <>
      <Container>
        {isLoading ? (
          <Alert variant="success">Getting data...</Alert>
        ) : 
        (<>
          <Container className="d-flex justify-content-between align-items-center">
            <h1>Partial Result</h1>
            <Button variant="outline-success" onClick={getAllFunction}>Refresh data</Button>
          </Container>  
          <Table bordered striped responsive variant="light" className="mt-1 text-center">
            <thead>
              <tr>
                <th className="green-header text-white">Rank</th>
                <th className="green-header text-white">Game</th>
                <th className="green-header text-white">Stars</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(game) && game.map((games, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{reveal ? games.game_name : games.game_letter}</td>
                  <td>{games.totalStars}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>)}
      </Container>
    </>
  );
};

export default PartialResult;
