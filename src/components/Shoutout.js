import axios from "axios";
import { useState, useEffect } from "react";
import { FaPlus, FaSyncAlt } from 'react-icons/fa';
import { Card, Row, Col, CardGroup, Container, Button, Spinner } from "react-bootstrap"
import ShoutoutForm from "./ShoutoutForm";


const Shoutout = () => {
	const [hasShoutOut, setHasShoutOut] = useState(false);
	const [shoutOut, setShoutOut] = useState([]);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
		getShoutOuts();
		setIsButtonDisabled(true);
		setHasShoutOut(false);
		setTimeout(() => {
			setHasShoutOut(true);
		}, 1000);

		setTimeout(() =>{
			setIsButtonDisabled(false);
		},3500)
	}
	useEffect(() =>{
		getShoutOuts();
	}, [])

	return ( 
		<>
			<Container className="d-flex justify-content-between align-items-center">
				<h1>Shoutouts</h1>
				<div className="text-end">
					<Button variant="outline-success mb-2" onClick={openShoutoutModal}><FaPlus size={13}/></Button>{" "}	
					{isButtonDisabled ? (
						<Button variant="outline-success mb-2" disabled><Spinner size="sm"/></Button>) : (
						<Button variant="outline-success mb-2" onClick={handleGetShoutout}><FaSyncAlt /></Button>	
					)}	
				</div>
			</Container>
			<Card bg="success" border="dark">
				<Card.Body>
					<Row>
						{!hasShoutOut ? (
							<h5 className="text-white text-center">Retrieving data <Spinner size="sm"/></h5>
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