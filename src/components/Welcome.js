import * as React from "react";
import "./Welcome.css";

import {useDencrypt} from "use-dencrypt-effect";
import {useState} from "react";
import {Link} from "react-router-dom";

const values = ["Welcome"];

const Welcome = () => {
  const {result, dencrypt} = useDencrypt();
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    let i = 0;

    const action = setInterval(() => {
      dencrypt(values[i]);

      i = i === values.length - 1 ? 0 : i + 1;
    }, 2000);

    const buttonOn = setInterval(() => {
      setDarkMode(true);
    }, 4000);

    return () => {
      clearInterval(action);
      clearInterval(buttonOn);
    }
  }, []);

  return (
    <div className="loadingScreenMainContainer">
      <h1 className="welcomeMessage">{result}</h1>
      {
        darkMode ?
          <Link to="/stats">
            <button className="needStatsButton">You need stats ?</button>
          </Link>
          : null
      }
    </div>
  );
};

export default Welcome;
