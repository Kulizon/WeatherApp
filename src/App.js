
import { Route, Redirect } from "react-router";
import { AnimatedSwitch } from "react-router-transition";

import ChangeLocation from "./pages/ChangeLocation";
import TodayForecast from "./pages/TodayForecast";
import WeekForecast from "./pages/WeekForecast";
import Options from "./pages/Options";

import styles from "./App.module.css";

function App() {
  return (
    <main className={styles.main}>
      <div className={styles.background}></div>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path="/" exact>
          <ChangeLocation></ChangeLocation>
        </Route>
        <Route path="/today" exact>
          <TodayForecast></TodayForecast>
        </Route>
        <Route path="/this-week" exact>
          <WeekForecast></WeekForecast>
        </Route>
        <Route path="/options" exact>
          <Options></Options>
        </Route>
        <Route path="*">
          <Redirect to="/today"></Redirect>
        </Route>
      </AnimatedSwitch>
    </main>
  );
}

export default App;
