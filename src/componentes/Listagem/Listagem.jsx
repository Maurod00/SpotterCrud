import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Listagem.css';

const Listagem = ({ registros, excluirRegistro }) => {
  const navigate = useNavigate();

  return (
    <section className="container-listagem">
      <div className="header-lista">
        <h2>✈️ Aeronaves Registradas</h2>
        <span className="badge">{registros.length} registros</span>
      </div>

      {registros.length === 0 ? (
        <div className="vazio">
          <p>Nenhum registro encontrado.</p>
        </div>
      ) : (
        <div className="grid-spotter">
          {registros.map((item) => (
            <div key={item.id} className="card-spotter">
              <div className="card-imagem">
                {item.imagem ? (
                  <img src={item.imagem} alt={item.modelo} />
                ) : (
                  <div className="sem-foto">Sem Foto</div>
                )}
                <span className="tag-prefixo">
                  <a href={`https://pt.airnavradar.com/data/registration/${item.prefixo}`} target='_blank'>{item.prefixo}</a>
                </span>
              </div>

              <div className="card-info">
                <h3>{item.modelo}</h3>
                <p>📍 {item.local}</p>
              </div>

              <div className="card-acoes">
                <button className="btn-editar" onClick={() => navigate(`/editar/${item.id}`)}>
                  Editar
                </button>
                <button className="btn-excluir" onClick={() => excluirRegistro(item.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="fab-novo" onClick={() => navigate('/novo')} title="Novo Spotting">
        +
      </button>
    </section>
  );
};

export default Listagem;