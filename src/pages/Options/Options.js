import { CSSTransition } from "react-transition-group";

import IconButton from "../../components/UI/IconButton/IconButton";
import OptionsMenu from "../../components/OptionsMenu/OptionsMenu";

import ArrowUp from "../../assets/arrow-up-solid";

import styles from "./Options.module.scss";

const Options = () => {
  return (
    <div className={`page ${styles.options}`}>
      <IconButton
        className={styles.icon}
        to="/this-week"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {ArrowUp}
      </IconButton>
      <CSSTransition classNames="fade-slide-in-bottom" in={true} appear timeout={300}>
        <OptionsMenu></OptionsMenu>
      </CSSTransition>
    </div>
  );
};

export default Options;
