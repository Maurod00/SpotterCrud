import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cabecalho from './componentes/Cabecalho/Cabecalho';
import Rodape from './componentes/Rodape/Rodape';
import Formulario from './componentes/Formulario/Formulario';
import Listagem from './componentes/Listagem/Listagem';
import Login from './componentes/Login/Login';
import Cadastro from './componentes/Cadastro/Cadastro';

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const logado = localStorage.getItem('spotter_logged_user');
    return logado ? JSON.parse(logado) : null;
  });

  const [registros, setRegistros] = useState(() => {
    const dadosSalvos = localStorage.getItem('spotter_data');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  useEffect(() => {
    localStorage.setItem('spotter_data', JSON.stringify(registros));
  }, [registros]);

  const handleLogout = () => {
    localStorage.removeItem('spotter_logged_user');
    setUsuarioLogado(null);
  };

  const salvarRegistro = (dados) => {
    if (dados.id) {
      const listaAtualizada = registros.map((item) =>
        item.id === dados.id ? dados : item
      );
      setRegistros(listaAtualizada);
    } else {
      const novoRegistro = { 
        ...dados, 
        id: Date.now(),
        userEmail: usuarioLogado.email 
      };
      setRegistros([...registros, novoRegistro]);
    }
  };

  const excluirRegistro = (id) => {
    if (window.confirm("Deseja remover este registro?")) {
      setRegistros(registros.filter((item) => item.id !== id));
    }
  };

  const registrosDoUsuario = registros.filter(r => r.userEmail === usuarioLogado?.email);

  return (
    <Router>
      <Cabecalho usuarioLogado={usuarioLogado} handleLogout={handleLogout} />
      <main className="conteudo-principal">
        <Routes>
          <Route path="/login" element={
            !usuarioLogado ? <Login setUsuarioLogado={setUsuarioLogado} /> : <Navigate to="/" />
          } />
          <Route path="/cadastro" element={
            !usuarioLogado ? <Cadastro /> : <Navigate to="/" />
          } />
          
          <Route path="/" element={
            usuarioLogado ? <Listagem registros={registrosDoUsuario} excluirRegistro={excluirRegistro} /> : <Navigate to="/login" />
          } />
          <Route path="/novo" element={
            usuarioLogado ? <Formulario salvarRegistro={salvarRegistro} /> : <Navigate to="/login" />
          } />
          <Route path="/editar/:id" element={
            usuarioLogado ? <Formulario salvarRegistro={salvarRegistro} registros={registros} /> : <Navigate to="/login" />
          } />
        </Routes>
      </main>
      <Rodape />
    </Router>
  );
}

export default App;