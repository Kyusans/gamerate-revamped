import { Container } from "react-bootstrap";
import CardView from "./CardView";
// import PartialResult from "./PartialResult";
import Shoutout from "./Shoutout";

const Home = () => {
  if(sessionStorage.getItem("url") !== "http://www.shareatext.com/itdays/api/"){
    sessionStorage.setItem("url", "http://www.shareatext.com/itdays/api/");
  }
  return (
    <>
      {/* <Container className="mt-4">
        <PartialResult />
        <hr />
      </Container> */}

      <Container>
        <Shoutout />
        <hr />
      </Container>

      <Container className="mt-1">
        <h1 className="mb-3 text-center">Games</h1>
        <CardView />
      </Container>
    </>
  );
};

export default Home;
