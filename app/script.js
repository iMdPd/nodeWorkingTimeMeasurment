const React = require("react");
const { createRoot } = require("react-dom/client");

const App = () => {
  const [status, setStatus] = React.useState("off");
  const [time, setTime] = React.useState(0);
  const [timer, setTimer] = React.useState(null);

  const convertTime = (seconds) => {
    const mm = String(Math.floor((seconds / 60) % 60)).padStart(2, "0");
    const ss = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const startTimer = () => {
    setTime(1200);
    setStatus("work");
    setTimer(
      setInterval(() => {
        setTime((prevValue) => prevValue - 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    if (timer) {
      setTime(0);
      setTimer(clearInterval(timer));
      setStatus("off");
    }
  };

  React.useEffect(() => {
    if (time < 0 && status === "work") {
      setTime(20);
      setStatus("rest");
    }
    if (time < 0 && status === "rest") {
      setTime(1200);
      setStatus("work");
    }
  }, [time]);

  React.useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  const closeApp = () => {
    window.close();
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === "off" && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === "work" && <img src="./images/work.png" />}
      {status === "rest" && <img src="./images/rest.png" />}
      {status !== "off" && <div className="timer">{convertTime(time)}</div>}
      {status === "off" && (
        <button onClick={startTimer} className="btn">
          Start
        </button>
      )}
      {status !== "off" && (
        <button onClick={stopTimer} className="btn">
          Stop
        </button>
      )}
      <button onClick={closeApp} className="btn btn-close">
        X
      </button>
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
// render(<App />, document.querySelector("#app"));
