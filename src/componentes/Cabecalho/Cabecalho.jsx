import React from 'react';
import './Cabecalho.css';

const Cabecalho = () => {
  return (
    <header className="cabecalho">
      <div className="logo">
        <span className="icon">✈️</span>
        <h1>SpotterCrud</h1>
      </div>
      <div className="status">
        <span>Live Tracking</span>
        <div className="dot"></div>
      </div>
    </header>
  );
};

export default Cabecalho;