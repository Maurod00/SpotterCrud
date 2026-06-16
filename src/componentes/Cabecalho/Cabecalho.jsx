import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cabecalho.css';

const Cabecalho = ({ usuarioLogado, handleLogout }) => {
  const navigate = useNavigate();
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      }, (error) => {
        console.error("Error Code: " + error.code + " - " + error.message);
      });
    }
  }, []);

  const urlLive = `https://pt.airnavradar.com/@${lat},${long},z10`;

  return (
    <header className="cabecalho">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <span className="icon">✈️</span>
        <h1>SpotterCrud</h1>
      </div>
      
      <div className="status-container">
        <div className="status">
          <span>
            <a href={urlLive} target="_blank" rel="noreferrer">Live Tracking</a>
          </span>
          <div className="dot"></div>
        </div>

        {usuarioLogado && (
          <div className="usuario-info">
            <span className="nome-usuario">Olá, {usuarioLogado.nome}</span>
            <button onClick={handleLogout} className="btn-logout">Sair</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Cabecalho;