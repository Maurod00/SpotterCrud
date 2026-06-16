import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setUsuarioLogado }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', senha: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.senha) {
      alert("Preencha todos os campos!");
      return;
    }

    const usuariosSalvos = JSON.parse(localStorage.getItem('spotter_users')) || [];
    const usuarioEncontrado = usuariosSalvos.find(
      u => u.email === formData.email && u.senha === formData.senha
    );

    if (!usuarioEncontrado) {
      alert("E-mail ou senha incorretos!");
      return;
    }

    localStorage.setItem('spotter_logged_user', JSON.stringify(usuarioEncontrado));
    setUsuarioLogado(usuarioEncontrado);
    navigate('/');
  };

  return (
    <section className="container-auth">
      <form onSubmit={handleSubmit} className="form-auth">
        <h2>Login SpotterCrud</h2>
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
        <button type="submit" className="btn-auth">Entrar</button>
        <p onClick={() => navigate('/cadastro')} className="link-auth">Não tem conta? Cadastre-se</p>
      </form>
    </section>
  );
};

export default Login;