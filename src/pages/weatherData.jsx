import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./weatherData.css"


const WeatherData = () => {
  const [contryData, setContryData] = useState([]);
  const [isClicked, setClick] = useState(false);
  const lat = 33.0;
  const long = 65.0;


  useEffect(() => {
    (async () => {
      const data = await fetch("https://restcountries.com/v2/all");
      const res = await data.json();
      setContryData(res);
    })();
  });

  //api call for weather api on click of "Click for Weather" button
  useEffect(() => {
    if (isClicked) {
      (async () => {
        // const data = await fetch(
        //   "http://api.openweathermap.org/geo/1.0/direct?q={contry.name},{contry.alpha2Code},{contry.alpha3Code}&limit={5}&appid={fdc16003f7c9155ca07157065e458a41}"
        // );
        const data = await fetch(
          `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        const res = await data.json();
        console.log(res);
      })();
    }
  }, [isClicked]);

  return (
    <div className="card-wrapper">
      {contryData.map((contry) => {
        return (
          <Card  key={contry.alpha2Code} className="card">
          <Card.Title className="card-title">{contry.name}</Card.Title>
          <Card.Img variant="top" src={contry.flag} className="card-img" />
          <Card.Body className="card-body">
            <Card.Text className="card-text">
            Capital : {contry.capital}
            </Card.Text>
            <Card.Text className="card-text">
            Region : {contry.region}
            </Card.Text>
            <Card.Text className="card-text">
            Country Code : {contry.alpha3Code}
            </Card.Text>
            <Button variant="primary" onClick={() => setClick(true)} className="card-button">Click for Weather</Button>
          </Card.Body>
        </Card> 
        );
      })}
    </div>
  );
};

export default WeatherData;
