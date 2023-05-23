import { useState, useEffect } from "react";
import "./App.css";
import desktopdivider from "./assets/images/pattern-divider-desktop.svg";
import mobiledivider from "./assets/images/pattern-divider-mobile.svg";
import icondice from "./assets/images/icon-dice.svg";
import ReactLoading from "react-loading";
function App() {
  const [fetchedadvice, setfetchedadvice] = useState("");
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const { id, advice } = fetchedadvice;
  const url = "https://api.adviceslip.com/advice";
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const { slip } = await response.json();
      console.log(response);
      setfetchedadvice(slip);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
