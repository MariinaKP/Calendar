import { SetStateAction, useContext, useState} from "react";
import styles from "./ThemeSelector.module.scss";
import {ThemeContext} from "../../context/ThemeContext";
import "../../styles/_variables.scss";
import "../../styles/main.scss";
export const ThemeSelector = () => {
  const {theme, setTheme} = useContext<any | null>(ThemeContext);
  const [selected, setSelected] = useState<any | null>(theme);

  const handleThemeChange = (color: string) => {
    if (selected === color) {
      setSelected(null);
    } else {
      setSelected(color);
      setTheme(color);
    }
  };

  return (
    <div className={styles.circles}>
      {selected ? (
        <button
          className={`${selected} ${styles.circle}`}
          onClick={() => setSelected(null)}
        ></button>
      ) : (
        <>
          <button
            className={`pink ${styles.circle}`}
            onClick={() => handleThemeChange("pink")}
            disabled={theme === "pink"}
          ></button>
          <button
            className={`blue ${styles.circle}`}
            onClick={() => handleThemeChange("blue")}
            disabled={theme === "blue"}
          ></button>
          <button
            className={`purple ${styles.circle}`}
            onClick={() => handleThemeChange("purple")}
            disabled={theme === "purple"}
          ></button>
          <button
            className={`green ${styles.circle}`}
            onClick={() => handleThemeChange("green")}
            disabled={theme === "green"}
          ></button>
          <button
            className={`orange ${styles.circle}`}
            onClick={() => handleThemeChange("orange")}
            disabled={theme === "orange"}
          ></button>
        </>
      )}
    </div>
  );
};