import React from 'react';
import './Listagem.css';

const Listagem = ({ registros, excluirRegistro, setRegistroParaEditar }) => {
  return (
    <section className="container-listagem">
      <div className="header-lista">
        <h2>✈️ Aeronaves Registradas</h2>
        <span className="badge">{registros.length} registros</span>
      </div>

      {registros.length === 0 ? (
        <div className="vazio">
          <p>Nenhum registro de spotting encontrado.</p>
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
                <span className="tag-prefixo">{item.prefixo}</span>
              </div>
              
              <div className="card-info">
                <h3>{item.modelo}</h3>
                <p>📍 {item.local}</p>
              </div>

              <div className="card-acoes">
                <button 
                  className="btn-editar" 
                  onClick={() => setRegistroParaEditar(item)}
                >
                  Editar
                </button>
                <button 
                  className="btn-excluir" 
                  onClick={() => excluirRegistro(item.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Listagem;