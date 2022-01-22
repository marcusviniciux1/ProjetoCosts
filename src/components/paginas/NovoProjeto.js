import { useNavigate } from "react-router-dom";

import ProjetoForm from "../projetos/ProjetoForm";

import styles from "./NovoProjeto.module.css";

function NovoProjeto() {
  const navigate = useNavigate();

  function createPost(projeto) {
    // inicializa cost e servicos
    projeto.cost = 0;
    projeto.servicos = [];

    fetch("http://localhost:5000/projetos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projeto),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // redireciona
        navigate("/projetos", {
          state: { mensagem: "Projeto criado com sucesso!" },
        });
      });
  }

  return (
    <div className={styles.novoprojeto_container}>
      <h1>Criar projeto</h1>
      <p>Crie seu produto para depois adicionar os serviços</p>
      <ProjetoForm handleSubmit={createPost} btnText="Criar projeto" />
    </div>
  );
}

export default NovoProjeto;
