import React, { useEffect, useState } from 'react';
import './Cabecalho.css';

const Cabecalho = () => {

  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)

  useEffect(() => {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
      }, (error) => {
        console.error("Error Code: " + error.code + " - " + error.message);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

  }, [])


  const urlLive = `https://pt.airnavradar.com/@${lat},${long},z10`

  return (
    <header className="cabecalho">
      <div className="logo">
        <span className="icon">✈️</span>
        <h1>SpotterCrud</h1>
      </div>
      <div className="status">
        <span>
          <a href={urlLive} target="_blank">Live Tracking</a>
        </span>
        <div className="dot"></div>
      </div>
    </header>
  );
};

export default Cabecalho;