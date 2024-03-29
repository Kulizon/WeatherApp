import styles from "./Button.module.scss";

const Button = (props) => {
  return (
    <button className={`${styles.button} ${props.className}`} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
