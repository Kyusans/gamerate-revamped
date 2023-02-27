import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import "./css/site.css"

const RateGame = (props) => {

    const {show, onHide, gameId } = props;
    
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
      setRating(value);
    };
    return ( 
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header>
                    <Modal.Title>
                        Rate this game
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="text-center">
                        <div className="rating-container">
                            <Rating
                            count={5}
                            size={50}
                            activeColor="#ffd700"
                            value={rating}
                            onChange={handleRating}
                            />
                        </div>
                        
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn-danger">Close</Button>
                    <Button className="" onClick={() => alert(`You rated ${rating} stars!`)}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default RateGame;