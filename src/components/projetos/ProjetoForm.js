import { useEffect, useState } from "react";

import Input from "../Form/Input";
import Select from "../Form/Select";
import Enviar from "../Form/Enviar";

import styles from "./ProjetoForm.module.css";

function ProjetoForm({ handleSubmit, btnText, projetoData }) {
  const [categorias, setCategorias] = useState([]);
  const [projeto, setProjeto] = useState(projetoData || {});

  useEffect(() => {
    fetch("http://localhost:5000/categorias", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategorias(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(projeto);
  };

  function handleChange(e) {
    setProjeto({ ...projeto, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProjeto({
      ...projeto,
      categoria: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={projeto.name ? projeto.name : ""}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={projeto.budget ? projeto.budget : ""}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categorias}
        handleOnChange={handleCategory}
        value={projeto.categoria ? projeto.categoria.id : ""}
      />
      <Enviar text={btnText} />
    </form>
  );
}

export default ProjetoForm;
