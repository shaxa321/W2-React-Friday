import { Row, Col } from "react-bootstrap";

const FooterIcons = (props) => {
  const handleIcons = (iconId = "10d") => {
    const imageUrl = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
    return imageUrl;
  };
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
  return (
    <Row>
      <Col
        xs={12}
        className=" d-flex align-items-center justify-content-center"
      >
        <h4>{props.WheaterCityData.name}</h4>
        <img
          className="ps-2 pb-1"
          src={
            "https://www.countryflagicons.com/FLAT/32/" +
            props.WheaterCityData.sys.country +
            ".png"
          }
          alt={" Country " + props.WheaterCityData.sys.country}
        />
      </Col>
      <Col className="customCard me-2 ms-2 mb-2 mt-2">
        <p>{props.WheaterCityData.dt}</p>
        <p
          className={
            "littleDeg " +
            (props.WheaterCityData.main.temp
              ? setColorDeg(
                  parseFloat(props.WheaterCityData.main.temp) - 273.15
                )
              : "littleDeg")
          }
        >
          {(parseFloat(props.WheaterCityData.main.temp) - 273.15)
            .toFixed(0)
            .toString()}
          °C
        </p>
        {
          <img
            className="w-25"
            src={handleIcons(props.WheaterCityData.weather[0].icon)}
            alt=""
          />
        }
      </Col>
    </Row>
  );
};
export default FooterIcons;
