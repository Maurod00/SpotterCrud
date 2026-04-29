import React, { useState, useEffect } from 'react';
import './Formulario.css';

const Formulario = ({ salvarRegistro, registroParaEditar, cancelarEdicao }) => {
  const [spotting, setSpotting] = useState({ 
    prefixo: '', 
    modelo: '', 
    local: '', 
    imagem: '' 
  });

  useEffect(() => {
    if (registroParaEditar) {
      setSpotting(registroParaEditar);
    }
  }, [registroParaEditar]);

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
      alert("Campos obrigatórios: Prefixo, Modelo e Local!");
      return;
    }
    salvarRegistro(spotting);
    setSpotting({ prefixo: '', modelo: '', local: '', imagem: '' });
  };

  return (
    <section className="container-formulario">
      <form onSubmit={handleSubmit} className="form-spotter">
        <h2>{registroParaEditar ? '📝 Editar Registro' : '✈️ Novo Spotting'}</h2>
        
        <div className="input-group">
          <label>Prefixo</label>
          <input 
            type="text" 
            placeholder="Ex: PR-GUO" 
            value={spotting.prefixo}
            onChange={(e) => setSpotting({...spotting, prefixo: e.target.value})}
          />
        </div>

        <div className="input-group">
          <label>Modelo</label>
          <input 
            type="text" 
            placeholder="Ex: Airbus A320" 
            value={spotting.modelo}
            onChange={(e) => setSpotting({...spotting, modelo: e.target.value})}
          />
        </div>

        <div className="input-group">
          <label>Localização</label>
          <input 
            type="text" 
            placeholder="Ex: SBPA (Porto Alegre)" 
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
            {registroParaEditar ? 'Atualizar' : 'Salvar Registro'}
          </button>
          {registroParaEditar && (
            <button type="button" onClick={cancelarEdicao} className="btn-cancelar">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Formulario;