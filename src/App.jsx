import { useState, useEffect, useRef } from "react";
import "./App.css";
import desktopdivider from "./assets/images/pattern-divider-desktop.svg";
import mobiledivider from "./assets/images/pattern-divider-mobile.svg";
import icondice from "./assets/images/icon-dice.svg";
import ReactLoading from "react-loading";
function App() {
  const [fetchedadvice, setfetchedadvice] = useState("");
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const { id, advice } = fetchedadvice;
  const previd = useRef(null);
  const url = "https://api.adviceslip.com/advice";
  const fetchData = async () => {
    try {
      if (fetchedadvice) {
        setfetchedadvice("");
        setLoading(true);
        setWarning(false);
      }
      setWarning(false);
      const response = await fetch(url);
      const { slip } = await response.json();
      setfetchedadvice(slip);
      setLoading(false);
      previd.current = fetchedadvice;
      // check prevData
      if (previd.current.id == slip.id) {
        setWarning(true);
        setfetchedadvice("");
        setLoading(false);
        setError(false);
        console.log("true try again");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (warning) {
    return (
      <section className="container">
        <div className="advice">
          <p style={{ color: "hsl(150, 100%, 66%)", fontSize: "20px" }}>
            Please try again after few seconds
          </p>
          <button className="btn advice-btn" onClick={fetchData}>
            <img src={icondice} alt="" />
          </button>
        </div>
      </section>
    );
  }
  if (Error) {
    return (
      <section className="container">
        <div className="advice">
          <p style={{ color: "hsl(150, 100%, 66%)" }}>there was an error</p>
          <button className="btn advice-btn" onClick={fetchData}>
            <img src={icondice} alt="" />
          </button>
        </div>
      </section>
    );
  }
  return (
    <section className="container">
      <div className="advice">
        {Loading && <div class="load"></div>}
        {fetchedadvice && (
          <>
            <h4 className="advice-id">ADVIDCE #{id}</h4>
            <q className="quota">{advice}</q>
            <div className="divider desktop-divider ">
              <img src={desktopdivider} alt="" />
            </div>
            <div className="divider mobile-divider ">
              <img src={mobiledivider} alt="" />
            </div>
          </>
        )}
        <button className="btn advice-btn" onClick={fetchData}>
          <img src={icondice} alt="" />
        </button>
      </div>
    </section>
  );
}

export default App;
