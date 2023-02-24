import { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";

const CalendarByDay = (props) => {
  const setColorDeg = (degValue = 0) => {
    switch (true) {
      case degValue >= 14:
        return "hotDeg";
        break;
      case degValue <= 0:
        return "coldDeg";
        break;
      default:
        return "normalDeg";
    }
  };
  const handleIcons = (iconId = "10d") => {
    const imageUrl = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
    return imageUrl;
  };
  const [forecast, setForecast] = useState();

  const fetchByForecast = async () => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          props.lat +
          "&lon=" +
          props.lon +
          "&appid=" +
          props.myCustomKey
      );
      if (response.ok) {
        const data = await response.json();
        setForecast(data);
        console.log("Forecast", data);
      } else {
        console.log("Error while fethcing");
      }
    } catch (error) {
      console.log("catch error", error);
    }
  };

  useEffect(() => {
    fetchByForecast();
  }, []);

  useEffect(() => {
    fetchByForecast();
  }, [props.lat]);

  return (
    <>
      <Container>
        <Row className="d-flex flex-direction-row justify-content-center">
          {forecast ? (
            forecast.list.map((element, index) => {
              if ((index + 1) % 8 === 0) {
                return (
                  <>
                    <Col className="customCard me-2 ms-2 mb-2 mt-2" xs={2}>
                      <Row>
                        <Col className="d-flex justify-content-center align-items-end">
                          <p className="whiteColor">
                            {element.dt_txt.slice(8, -9)}
                          </p>
                          <p className="blackColor">
                            {element.dt_txt.slice(11, -3)}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="d-flex flex-direction-row justify-content-start align-items-center">
                          <p
                            className={
                              "littleDeg " +
                              (element.main.temp
                                ? setColorDeg(
                                    parseFloat(element.main.temp) - 273.15
                                  )
                                : "littleDeg")
                            }
                          >
                            {(parseFloat(element.main.temp) - 273.15)
                              .toFixed(0)
                              .toString()}
                            °C
                          </p>
                          <img
                            src={handleIcons(element.weather[0].icon)}
                            alt=""
                          />
                        </Col>
                      </Row>
                    </Col>
                  </>
                );
              }
            })
          ) : (
            <p>Cavolo</p>
          )}
        </Row>
      </Container>
    </>
  );
};
export default CalendarByDay;
