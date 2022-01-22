import { useState } from "react";

import Input from "../Form/Input";
import Enviar from "../Form/Enviar";

import styles from "../projetos/ProjetoForm.module.css";

function ServiceForm({ handleSubmit, btnText, projetoData }) {
  const [service, setService] = useState({});

  function submit(e) {
    e.preventDefault();
    projetoData.services = service;
    handleSubmit(projetoData);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={submit}>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      />
      <Enviar text={btnText} />
    </form>
  );
}

export default ServiceForm;
