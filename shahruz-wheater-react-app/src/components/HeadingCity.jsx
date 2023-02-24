import { Row, Col } from "react-bootstrap";

import { TbWorldLongitude } from "react-icons/tb";
import CurrentTime from "./CurrentTime";

const HeadingCity = (props) => {
  return (
    <Row className="text-center">
      <Col xs={12} className="d-flex justify-content-center align-items-center">
        <h2>{props.cityData ? props.cityData.name : "città non trovata"}</h2>
        <img
          className="ps-2 pb-1"
          src={
            "https://www.countryflagicons.com/FLAT/64/" +
            props.cityData.country +
            ".png"
          }
          alt={" Country " + props.cityData.country}
        />
      </Col>
      <Col xs={12}>
        <div>
          <p className="subText">
            Lat :
            {props.cityData
              ? parseFloat(props.cityData.lat).toFixed(2).toString()
              : "Lat?"}
            <TbWorldLongitude />
            Lon :
            {props.cityData
              ? parseFloat(props.cityData.lon).toFixed(2).toString()
              : "Lon?"}
          </p>
          <CurrentTime />
        </div>
      </Col>
    </Row>
  );
};
export default HeadingCity;
