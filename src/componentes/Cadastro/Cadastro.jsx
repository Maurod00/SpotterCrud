import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.senha) {
      alert("Preencha todos os campos!");
      return;
    }

    const usuariosSalvos = JSON.parse(localStorage.getItem('spotter_users')) || [];
    const emailExiste = usuariosSalvos.some(u => u.email === formData.email);

    if (emailExiste) {
      alert("Este e-mail já está cadastrado!");
      return;
    }

    usuariosSalvos.push(formData);
    localStorage.setItem('spotter_users', JSON.stringify(usuariosSalvos));
    alert("Usuário cadastrado com sucesso!");
    navigate('/login');
  };

  return (
    <section className="container-auth">
      <form onSubmit={handleSubmit} className="form-auth">
        <h2>Criar Conta Spotter</h2>
        <div className="input-group">
          <label>Nome</label>
          <input 
            type="text" 
            value={formData.nome} 
            onChange={(e) => setFormData({...formData, nome: e.target.value})} 
          />
        </div>
        <div className="input-group">
          <label>E-mail</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
        </div>
        <div className="input-group">
          <label>Senha</label>
          <input 
            type="password" 
            value={formData.senha} 
            onChange={(e) => setFormData({...formData, senha: e.target.value})} 
          />
        </div>
        <button type="submit" className="btn-auth">Cadastrar</button>
        <p onClick={() => navigate('/login')} className="link-auth">Já tem uma conta? Entre aqui</p>
      </form>
    </section>
  );
};

export default Cadastro;