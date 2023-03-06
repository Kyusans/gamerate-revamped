import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap"

const Shoutout = () => {
	const [hasShoutOut, setHasShoutOut] = useState(false);
	const [shoutOut, setShoutOut] = useState([]);

	const getShoutOuts = async () =>{
		const url = sessionStorage.getItem("url")+ "shoutout.php";
		const jsonData = {limit: 4}
		const formData = new FormData();
		formData.append("operation", "getShoutOuts");
		formData.append("json", JSON.stringify(jsonData));
		try {
			const res = await axios({url: url,data: formData,method: "post"})
			if(res.data !== 0){
				setHasShoutOut(true)
				setShoutOut(res.data);
			}
		}catch(err){
			alert("There was an error occured: " + err)
		}
	}

	useEffect(() =>{
		getShoutOuts();
		const intervalId = setInterval(getShoutOuts, 20000);
		return () => clearInterval(intervalId);
	}, [])
	return ( 
		<>
			<Card bg="success" border="dark">
				<Card.Body className="text-center">
						{ !hasShoutOut ? <h3 className="text-white">There is no shout out yet...</h3> :
							shoutOut.map((shoutOuts, index) => (
								<Row key={index}>
									<Col className="mb-3">
										<Card border="dark" bg="light">
											<Card.Body>
												<Card.Text>
													<i>{'"' + shoutOuts.sh_shoutout + '"'}</i>
												</Card.Text>
												<Card.Subtitle>{"-" + shoutOuts.sh_nickName}</Card.Subtitle>
											</Card.Body>
										</Card>
									</Col>
								</Row>
							))
						}
					
				</Card.Body>
			</Card>
		</>	
	);
}
 
export default Shoutout;