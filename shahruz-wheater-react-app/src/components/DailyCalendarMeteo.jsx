import { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";

const DailyCalendarMeteo = (props) => {
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
      <p>
        lon{props.lon}lat{props.lat},key{props.myCustomKey}
      </p>

      <Container>
        <Row>
          {forecast ? (
            forecast.list.map((element) => {
              return (
                <Col xs={2}>
                  <p>{element.dt_txt}</p>
                  <p>
                    {(parseFloat(element.main.temp) - 273.15)
                      .toFixed(0)
                      .toString()}
                    °C
                  </p>
                  <img src={handleIcons(element.weather[0].icon)} alt="" />
                </Col>
              );
            })
          ) : (
            <p>Cavolo</p>
          )}
        </Row>
      </Container>
    </>
  );
};
export default DailyCalendarMeteo;
