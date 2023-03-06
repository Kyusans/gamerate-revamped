import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Row, Col, CardGroup, Container, Button } from "react-bootstrap"
import ShoutoutForm from "./ShoutoutForm";


const Shoutout = () => {
	const [hasShoutOut, setHasShoutOut] = useState(false);
	const [shoutOut, setShoutOut] = useState([]);

	const [showShoutoutModal, setShowShoutoutModal] = useState(false);
  const openShoutoutModal = () =>{
    setShowShoutoutModal(true);
  }
  const closeShoutoutModal =  () =>{
    setShowShoutoutModal(false);
  }

	const getShoutOuts = async () =>{
		const url = sessionStorage.getItem("url")+ "shoutout.php";
		const jsonData = {limit: 2}
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
			alert("SHOUT OUT There was an error occured: " + err)
		}
	}

	function handleGetShoutout(){
		setHasShoutOut(false);
		setTimeout(() => {
			setHasShoutOut(true)
			getShoutOuts()
		}, 500);
	}
	useEffect(() =>{
		getShoutOuts();
	}, [])

	return ( 
		<>
			<Container className="d-flex justify-content-between align-items-center">
				<h1>Shoutouts</h1>
				<div className="text-end">
					<Button variant="outline-success mb-2" onClick={openShoutoutModal}>Create Shoutout</Button>{" "}	
					<Button variant="outline-success mb-2" onClick={handleGetShoutout}>Refresh data</Button>		
				</div>
			</Container>
			<Card bg="success" border="dark">
				<Card.Body>
					<Row>
						{!hasShoutOut ? (
							<h5 className="text-white text-center">Getting data...</h5>
						) : (
							<>
								{shoutOut.map((shoutOuts, index) => (
									<Col className="minimum-height" key={index} md={6} xs={12}>
										<CardGroup className="justify-content-center">
											<Card border="dark" bg="light">
												<Card.Body>
													<Card.Text>
														<i>{"'" + shoutOuts.sh_shoutout + "'"}</i>
													</Card.Text>
													<Card.Subtitle>{"-" + shoutOuts.sh_nickName}</Card.Subtitle>
												</Card.Body>
											</Card>
										</CardGroup>
									</Col>
								))}
							</>
						)}
					</Row>
				</Card.Body>
			</Card>

			<ShoutoutForm show={showShoutoutModal} onHide={closeShoutoutModal} />
		</>	
	);
}
 
export default Shoutout;