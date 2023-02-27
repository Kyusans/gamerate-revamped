import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

const PartialResult = () => {
    const [game, setGame] = useState([]);

    useEffect(() => {
      getGames();
    },)
    

    const getGames = () =>{
        const url = "http://localhost/gamerate/games.php";

        const formData = new FormData();

        formData.append("operation", "getGameResult");

        axios({
            url: url,
            data: formData,
            method: "post"
        })

        .then((res) =>{
            if(res.data !== 0){
                setGame(res.data);
            }
        })
    }
    return ( 
        <>
            <Container>
                <Table bordered striped responsive variant="light" className="mt-3">
                    <thead>
                    <tr>
                        <th className="green-header text-white">Rank</th>
                        <th className="green-header text-white">Letter</th>
                        <th className="green-header text-white">Stars</th>
                    </tr>
                    </thead>
                    <tbody>
                    {game.map((games, index) => (
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{games.game_letter}</td>
                        <td>{games.game_rate}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
 
export default PartialResult;