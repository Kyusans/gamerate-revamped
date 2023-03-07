import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const AlertScript = (props) => {
    const {show, variant, message} = props;

    const [handleShow, setHandleShow] = useState(false);

    useEffect(() =>{
        setHandleShow(show);
    },[show])
    
    return ( 
        <>
            <Alert variant={variant} show={handleShow}>
                {message}
            </Alert>
        </>
     );
}

export default AlertScript;