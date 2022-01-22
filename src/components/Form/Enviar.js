import styles from "./Enviar.module.css";

function Enviar({ text }) {
  return (
    <div>
      <button className={styles.btn}>{text}</button>
    </div>
  );
}

export default Enviar;
