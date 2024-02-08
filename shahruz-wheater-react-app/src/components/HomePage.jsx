import { Container, Row, Col } from "react-bootstrap";
import HeadingCity from "./HeadingCity";
import { useRef, useState } from "react";
import { useEffect } from "react";
import FooterIcons from "./FooterIcons";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const HomePage = () => {
  let myCustomKey = "56886f6bd3518ec41af0aa5784fe3cca";
  const locations = [
    { name: "Rome", lat: 41.8933203, lon: 12.4829321 },
    { name: "Astana", lat: 51.1282205, lon: 71.4306682 },
    { name: "Singapore", lat: 1.2899175, lon: 103.8519072 },
    { name: "NewYork", lat: 40.712, lon: -74.006 },
  ];

  const [WheaterRomeData, setWheaterRomeData] = useState();
  const [WheaterSingaporeData, setWheaterSingaporeData] = useState();
  const [WheaterNewYorkData, setWheaterNewYorkData] = useState();
  const [WheaterAstanaData, setWheaterAstanaData] = useState();
  let counter = useRef(0);

  const fetchByPosition = async (current) => {
    console.log("HOLLLLLLLASSSSSSSSSSSSSSSSS");
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          locations[current].lat +
          "&lon=" +
          locations[current].lon +
          "&appid=" +
          myCustomKey
      );
      if (response.ok) {
        const data = await response.json();
        console.log("HOLLA HOLLA");
        await console.log("HOLLAHOLLA ", data);
        switch (current) {
          case 0:
            setWheaterRomeData(data);
            break;
          case 1:
            setWheaterAstanaData(data);

            break;
          case 2:
            setWheaterSingaporeData(data);
            break;
          case 3:
            setWheaterNewYorkData(data);
            break;
          default:
        }
      } else {
        console.log("HOLLA Error while fethcing");
      }
    } catch (error) {
      console.log("catch error", error);
    }
  };

  useEffect(() => {
    console.log("i am component did mount HomePage", counter);
    while (counter.current < 4) {
      fetchByPosition(counter.current);
      counter.current++;
    }
  }, []);

  if (
    WheaterAstanaData &&
    WheaterNewYorkData &&
    WheaterRomeData &&
    WheaterSingaporeData
  ) {
    return (
      <>
        <Container>
          <Row className="d-flex justify-content-start">
            <Col xs={5}>
              <FooterIcons WheaterCityData={WheaterRomeData} />
            </Col>

            <Col xs={5}>
              <FooterIcons WheaterCityData={WheaterNewYorkData} />
            </Col>
          </Row>
          <Row className="d-flex justify-content-end">
            <Col xs={1}>
              <Link to="/search">
                <BsFillArrowRightCircleFill className="arrow" />
              </Link>
            </Col>
          </Row>
          <Row className="d-flex justify-content-start">
            <Col xs={5}>
              <FooterIcons WheaterCityData={WheaterSingaporeData} />
            </Col>
            <Col xs={5}>
              <FooterIcons WheaterCityData={WheaterAstanaData} />
            </Col>
          </Row>
        </Container>
      </>
    );
  } else
    return (
      <div className="middleDiv d-flex justify-content-center align-items-center">
        <Spinner className="middleDiv" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
};

export default HomePage;
