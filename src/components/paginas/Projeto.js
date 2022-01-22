import { parse, v4 as uuidv4 } from "uuid";

import styles from "./Projeto.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjetoForm from "../projetos/ProjetoForm";
import Mensagem from "../layout/Mensagem";
import ServiceForm from "../service/ServiceForm";

function Projeto() {
  const { id } = useParams();

  const [projeto, setProjeto] = useState([]);
  const [showProjetoForm, setShowProjetoForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [type, setType] = useState("sucesso");

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projetos/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjeto(data);
        })
        .catch((err) => console.log);
    }, 500);
  }, [id]);

  function editPost(projeto) {
    //budget validation
    if (projeto.budget < projeto.cost) {
      setMensagem("O orçamento não pode ser menor que o custo do projeto!");
      setType("erro");
      return false;
    }

    fetch(`http://localhost:5000/projetos/${projeto.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(projeto),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjeto(data);
        setShowProjetoForm(false);
        setMensagem("Projeto atualizado!");
        setType("sucesso");
        //mensagem
      })
      .catch((err) => console.log(err));
  }

  function createService(projeto) {
    //ultimo serviço
    const ultimoServico = projeto.services[projeto.services.lenght - 1];

    ultimoServico.id = uuidv4();

    const ultimoServicoCost = ultimoServico.cost;

    const newCost = parseFloat(projeto.cost) + parseFloat(ultimoServicoCost);

    if (newCost > parseFloat(projeto.budget)) {
      setMensagem("Orçamento ultrapassado! Verifique o valor do serviço.");
      setType("erro");
      projeto.services.pop();
      return false;
    }

    projeto.cost = newCost;

    fetch(`http://localhost:5000/projetos/${projeto.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application;json",
      },
      body: JSON.stringify(projeto),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  function toggleProjetoForm() {
    setShowProjetoForm(!showProjetoForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {projeto.name ? (
        <div className={styles.projeto_detalhes}>
          <Container customClass="column">
            {mensagem && <Mensagem type={type} msg={mensagem} />}
            <div className={styles.detalhes_container}>
              <h1>Projeto: {projeto.name}</h1>
              <button className={styles.btn} onClick={toggleProjetoForm}>
                {!showProjetoForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjetoForm ? (
                <div className={styles.projeto_info}>
                  <p>
                    <span>Categoria:</span>
                    {projeto.categoria.name}
                  </p>
                  <p>
                    <span>Total de orçamento:</span>
                    R${projeto.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span>
                    R${projeto.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.projeto_info}>
                  <ProjetoForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projetoData={projeto}
                  />
                </div>
              )}
            </div>
            <div className={styles.detalhes_form_container}>
              <h2>Adicione um serviço</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.projeto_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar serviço"
                    projetoData={projeto}
                  />
                )}
              </div>
            </div>
            <h2>Servicos</h2>
            <Container customClass="start">
              <p>Nenhum serviço</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Projeto;
