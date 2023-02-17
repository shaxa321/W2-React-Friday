import { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { TbAngle, TbWorldLongitude } from "react-icons/tb";
import { BsFillCloudFog2Fill, BsFillForwardFill } from "react-icons/bs";
import CityMap from "./Citymap";
import DailyCalendarMeteo from "./DailyCalendarMeteo";
import CurrentTime from "./CurrentTime";

const CustomForm = () => {
  const [cityQuery, setCityQuery] = useState("Siena");
  const [inputCityQuery, setInputCityQuery] = useState("");
  const [cityData, setCityData] = useState(null);
  const [wheaterCityData, setWheaterCityData] = useState(null);

  let limit = 1;
  let myCustomKey = "56886f6bd3518ec41af0aa5784fe3cca";
  let counter = 0;

  const handleIcons = (iconId = "10d") => {
    console.log("handle Icons", iconId);
    const imageUrl = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
    return imageUrl;
  };

  const fetchByCity = async () => {
    try {
      const response = await fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
          cityQuery +
          "&" +
          "limit=" +
          limit +
          "&appid=" +
          myCustomKey
      );
      if (response.ok) {
        const data = await response.json();
        setCityData(data[0]);
        console.log("CITYDATA", cityData);
        console.log("DATA", data[0]);
      } else {
        console.log("Error while fethcing");
      }
    } catch (error) {
      console.log("catch error", error);
    }
  };

  const fetchByPosition = async () => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          cityData.lat +
          "&lon=" +
          cityData.lon +
          "&appid=" +
          myCustomKey
      );
      if (response.ok) {
        const data = await response.json();

        console.log("WHEATER DATA ", data);
        setWheaterCityData(data);
      } else {
        console.log("Error while fethcing");
      }
    } catch (error) {
      console.log("catch error", error);
    }
  };

  /*useEffect(() => {
    fetchByCity();
  }, []);*/

  useEffect(() => {
    fetchByCity();
    fetchByPosition();
  }, [cityQuery]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Search by City</Form.Label>
          <Form.Control
            value={inputCityQuery}
            type="input"
            placeholder="Enter city"
            onChange={(e) => {
              setInputCityQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                setInputCityQuery("");
                setCityQuery(e.target.value);
              }
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your secrets with anyone else.
          </Form.Text>
        </Form.Group>
      </Form>
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <div>
              <h2>{cityData ? cityData.name : "città non trovata"}</h2>
              <p className="subText">
                Lat :
                {cityData
                  ? parseFloat(cityData.lat).toFixed(2).toString()
                  : "Lat?"}
                <TbWorldLongitude />
                Lon :
                {cityData
                  ? parseFloat(cityData.lon).toFixed(2).toString()
                  : "Lon?"}
              </p>
              <CurrentTime />
            </div>
          </Col>
        </Row>
        <Row className="d-flex flex-row justify-content-center ms-5 me-5 text-center">
          <Col xs={3} className="customCard ms-2 me-2 pt-2 pb-2">
            <h3>
              {wheaterCityData ? wheaterCityData.weather[0].main : "niente"}
            </h3>
            <p className="subText">
              {wheaterCityData
                ? wheaterCityData.weather[0].description
                : "niente"}
            </p>
            <img
              src={
                wheaterCityData
                  ? handleIcons(wheaterCityData.weather[0].icon)
                  : "http://placekitten.com/g/200/300"
              }
              alt=""
            />
            <p>
              {wheaterCityData ? wheaterCityData.wind.deg : "niente"} DEG
              <BsFillCloudFog2Fill></BsFillCloudFog2Fill>
              {wheaterCityData ? wheaterCityData.wind.speed : "Niente"}
              <BsFillForwardFill></BsFillForwardFill> KM/H
            </p>
          </Col>

          <Col
            xs={3}
            className="d-flex justify-content-center align-items-center customCard ms-2 me-2"
          >
            <p className="mainDeg">
              {wheaterCityData
                ? (parseFloat(wheaterCityData.main.temp) - 273.15)
                    .toFixed(0)
                    .toString()
                : "niente"}
              °C
            </p>
          </Col>
        </Row>
      </Container>
      <DailyCalendarMeteo
        lat={cityData ? cityData.lat : "43.318661"}
        lon={cityData ? cityData.lon : "11.362180"}
        myCustomKey={myCustomKey}
      />
    </>
  );
};
export default CustomForm;
