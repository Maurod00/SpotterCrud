import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cabecalho from './componentes/Cabecalho/Cabecalho';
import Rodape from './componentes/Rodape/Rodape';
import Formulario from './componentes/Formulario/Formulario';
import Listagem from './componentes/Listagem/Listagem';

function App() {
  const [registros, setRegistros] = useState(() => {
    const dadosSalvos = localStorage.getItem('spotter_data');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  useEffect(() => {
    localStorage.setItem('spotter_data', JSON.stringify(registros));
  }, [registros]);

  const salvarRegistro = (dados) => {
    if (dados.id) {
      const listaAtualizada = registros.map((item) =>
        item.id === dados.id ? dados : item
      );
      setRegistros(listaAtualizada);
    } else {
      const novoRegistro = { ...dados, id: Date.now() };
      setRegistros([...registros, novoRegistro]);
    }
  };

  const excluirRegistro = (id) => {
    if (window.confirm("Deseja remover este registro?")) {
      setRegistros(registros.filter((item) => item.id !== id));
    }
  };

  return (
    <Router>
      <Cabecalho />
      <main className="conteudo-principal">
        <Routes>
          <Route path="/" element={
            <Listagem registros={registros} excluirRegistro={excluirRegistro} />
          } />
          <Route path="/novo" element={
            <Formulario salvarRegistro={salvarRegistro} />
          } />
          <Route path="/editar/:id" element={
            <Formulario salvarRegistro={salvarRegistro} registros={registros} />
          } />
        </Routes>
      </main>
      <Rodape />
    </Router>
  );
}

export default App;