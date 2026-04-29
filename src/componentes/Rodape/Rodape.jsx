import React from 'react';
import './Rodape.css';

const Rodape = () => {
  return (
    <footer className="rodape">
      <div className="rodape-conteudo">
        <p>SpotterCrud &copy; {new Date().getFullYear()}</p>
        <span>Monitoramento de Aeronaves</span>
      </div>
    </footer>
  );
};

export default Rodape;