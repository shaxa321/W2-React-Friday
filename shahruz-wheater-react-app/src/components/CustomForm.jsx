import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Spinner } from "react-bootstrap";
import { TbWorldLongitude } from "react-icons/tb";

import CurrentTime from "./CurrentTime";
import CalendarByDay from "./CalendarByDay";
import CurrentDayWeather from "./CurrentDayWeather";

const CustomForm = () => {
  const [inputCityQuery, setInputCityQuery] = useState(null);
  const [cityQuery, setCityQuery] = useState("London");
  const [cityData, setCityData] = useState();
  /*const [cityData, setCityData] = useState({
    lat: 41.8933203,
    lon: 12.4829321,
  });*/

  let limit = 1;
  let myCustomKey = "56886f6bd3518ec41af0aa5784fe3cca";

  const setColorDeg = (degValue = 0) => {
    switch (true) {
      case degValue >= 14:
        return "hotDeg";

      case degValue <= 0:
        return "coldDeg";

      default:
        return "normalDeg";
    }
  };

  const handleIcons = (iconId = "10d") => {
    console.log("handle Icons", iconId);
    const imageUrl = "http://openweathermap.org/img/wn/" + iconId + "@4x.png";
    return imageUrl;
  };

  const fetchByCity = async () => {
    console.log("FetchBYCIty");
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
        console.log("Fetch by city OK");
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

    console.log("component montaggio");
  }, []);

  useEffect(() => {
    console.log("i am component did update");
    fetchByCity();
  }, [cityQuery]);

  return (
    <>
      {cityData ? (
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
                <Row>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label></Form.Label>
                      <Form.Control
                        className="inputChange"
                        value={inputCityQuery}
                        type="input"
                        placeholder="Enter city"
                        onChange={(e) => {
                          setInputCityQuery(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.code === "Enter") {
                            console.log("!!!!!!!!!!!!!!!!!!pressent enter");
                            setInputCityQuery("");
                            setCityQuery(e.target.value);
                          }
                        }}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                  </Form>
                </Row>
              </div>
            </Col>
          </Row>
          <CurrentDayWeather
            setColorDeg={setColorDeg}
            handleIcons={handleIcons}
            myCustomKey={myCustomKey}
            cityData={cityData}
          />
        </Container>
      ) : (
        <Container>
          <Row className="justify-content-center">
            <Col md={4}></Col>
            <Spinner
              animation="border"
              role="status"
              variant="primary"
              size="lg"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Row>
        </Container>
      )}

      <CalendarByDay
        lat={cityData ? cityData.lat : "43.318661"}
        lon={cityData ? cityData.lon : "11.362180"}
        myCustomKey={myCustomKey}
      />
    </>
  );
};
export default CustomForm;
