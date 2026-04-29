import React, { useState, useEffect } from 'react';
import Cabecalho from './componentes/Cabecalho/Cabecalho';
import Rodape from './componentes/Rodape/Rodape';
import Formulario from './componentes/Formulario/Formulario';
import Listagem from './componentes/Listagem/Listagem';

function App() {
  const [registros, setRegistros] = useState(() => {
    const dadosSalvos = localStorage.getItem('spotter_data');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });
  
  const [registroParaEditar, setRegistroParaEditar] = useState(null);

  useEffect(() => {
    localStorage.setItem('spotter_data', JSON.stringify(registros));
  }, [registros]);

  const salvarRegistro = (dados) => {
    if (dados.id) {
      const listaAtualizada = registros.map((item) =>
        item.id === dados.id ? dados : item
      );
      setRegistros(listaAtualizada);
      setRegistroParaEditar(null);
    } else {
      const novoRegistro = { 
        ...dados, 
        id: Date.now() 
      };
      setRegistros([...registros, novoRegistro]);
    }
  };

  const excluirRegistro = (id) => {
    if (window.confirm("Tem certeza que deseja remover este registro de spotting?")) {
      const listaFiltrada = registros.filter((item) => item.id !== id);
      setRegistros(listaFiltrada);
    }
  };

  const cancelarEdicao = () => {
    setRegistroParaEditar(null);
  };

  return (
    <>
      <Cabecalho />
      <main className="conteudo-principal">
        <Formulario 
          salvarRegistro={salvarRegistro} 
          registroParaEditar={registroParaEditar}
          cancelarEdicao={cancelarEdicao}
        />
        <Listagem 
          registros={registros} 
          excluirRegistro={excluirRegistro} 
          setRegistroParaEditar={setRegistroParaEditar}
        />
      </main>
      <Rodape />
    </>
  );
}

export default App;