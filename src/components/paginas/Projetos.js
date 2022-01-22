import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Mensagem from "../layout/Mensagem";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjetoCard from "../projetos/ProjetoCard";
import Loading from "../layout/Loading";

import styles from "./Projetos.module.css";

function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projetoMensagem, setProjetoMensagem] = useState("");

  const location = useLocation();
  let mensagem = "";
  if (location.state) {
    mensagem = location.state.mensagem;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projetos", {
        method: "GET",
        headers: {
          "Content-Type": "application;json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjetos(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, []);

  function removeProjeto(id) {
    fetch(`http://localhost:5000/projetos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application;json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjetos(projetos.filter((projeto) => projeto.id !== id));
        setProjetoMensagem("Projeto removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.projeto_container}>
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton to="/novoprojeto" text="Criar projeto" />
      </div>
      {mensagem && <Mensagem type="sucesso" msg={mensagem} />}
      {projetoMensagem && <Mensagem type="sucesso" msg={projetoMensagem} />}
      <Container customClass="start">
        {projetos.length > 0 &&
          projetos.map((projeto) => (
            <ProjetoCard
              id={projeto.id}
              name={projeto.name}
              budget={projeto.budget}
              categoria={projeto.categoria.name}
              key={projeto.id}
              handleRemove={removeProjeto}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projetos.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Projetos;
