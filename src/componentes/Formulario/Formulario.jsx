import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Formulario.css';

const Formulario = ({ salvarRegistro, registros }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spotting, setSpotting] = useState({ 
    prefixo: '', 
    modelo: '', 
    local: '', 
    imagem: '' 
  });

  useEffect(() => {
    if (id && registros) {
      const registroExistente = registros.find(r => r.id === parseInt(id));
      if (registroExistente) {
        setSpotting(registroExistente);
      }
    }
  }, [id, registros]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSpotting({ ...spotting, imagem: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!spotting.prefixo || !spotting.modelo || !spotting.local) {
      alert("Preencha os campos obrigatórios!");
      return;
    }
    salvarRegistro(spotting);
    navigate('/');
  };

  return (
    <section className="container-formulario">
      <form onSubmit={handleSubmit} className="form-spotter">
        <h2>{id ? '📝 Editar Registro' : '✈️ Novo Spotting'}</h2>
        
        <div className="input-group">
          <label>Prefixo</label>
          <input 
            type="text" 
            value={spotting.prefixo}
            onChange={(e) => setSpotting({...spotting, prefixo: e.target.value})}
          />
        </div>

        <div className="input-group">
          <label>Modelo</label>
          <input 
            type="text" 
            value={spotting.modelo}
            onChange={(e) => setSpotting({...spotting, modelo: e.target.value})}
          />
        </div>

        <div className="input-group">
          <label>Localização</label>
          <input 
            type="text" 
            value={spotting.local}
            onChange={(e) => setSpotting({...spotting, local: e.target.value})}
          />
        </div>

        <div className="input-group">
          <label>Foto da Aeronave</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
          />
          {spotting.imagem && (
            <div className="preview-mini">
              <img src={spotting.imagem} alt="Preview" />
            </div>
          )}
        </div>

        <div className="acoes">
          <button type="submit" className="btn-salvar">
            {id ? 'Atualizar' : 'Salvar Registro'}
          </button>
          <button type="button" onClick={() => navigate('/')} className="btn-cancelar">
            Voltar
          </button>
        </div>
      </form>
    </section>
  );
};

export default Formulario;