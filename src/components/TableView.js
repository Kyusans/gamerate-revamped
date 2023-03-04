import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/site.css";

const TableView = () => {
    const [game, setGame] = useState([]);
    const navigateTo = useNavigate();
    

    useEffect(() =>{
        getGames();
    }, [game])

    const getGames = () =>{
        const url = sessionStorage.getItem("url") + "games.php";

        const formData = new FormData();

        formData.append("operation", "getGames");

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

    const handleSelectedGame = (gameId) =>{
        navigateTo("/game", {state:{selectedGameId: gameId}})
    }

    return ( 
        <>
            <Table responsive striped bordered className="text-center" variant="light">
                <thead>
                    <tr>
                        <th className="green-header text-white">Game Title</th>
                    </tr>
                </thead>

                <tbody>
                    {game.map((games, index) => (
                        <tr key={index}>
                            <td><span className="link-text text-primary" onClick={() => (handleSelectedGame(games.game_id))}>{games.game_name}</span></td>
                        </tr>
                        
                    ))}
                </tbody>
            </Table>
        </>
     );
}
 
export default TableView;