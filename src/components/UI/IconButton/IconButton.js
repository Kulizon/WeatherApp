import { Link } from "react-router-dom";

import styles from "./IconButton.module.scss";

const IconButton = (props) => {
  return (
    <Link to={props.to} className={`${styles.button} ${props.className}`}>
      <button onClick={props.onClick}>{props.children}</button>
    </Link>
  );
};

export default IconButton;
