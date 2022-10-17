import {useState, useEffect} from "react";

import './App.css';

function App() {
  const [info, setInfo] = useState({});
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let query = "";
    if (urlParams.has("date")) {
        let tempDate = urlParams.get("date");
        let day = tempDate.slice(6);
        let month = tempDate.slice(4, 6);
        let year = tempDate.slice(0, 4);
        let x = new Date();
        let y = new Date(year, month, day)
        if (x.getDate() <= y.getDate()) {
         window.location = "/"; 
        }
        else {
          setDate(new Date(year + "-" + month + "-" + day));
          query = "&date=" + year + "-" + month + "-" + day;
        }
    }
    let x = fetch("https://api.nasa.gov/planetary/apod?api_key=Y6B4IaLMDUCTazA7oMxOaz1OJnRnxBErwOnOAUy8"+query).then(res=>res.json()).then(json => {
        setInfo(json);
        console.log(json);
    });
    }, []);

  function prevDate() {
    const newDay = new Date(date);

    newDay.setDate(newDay.getDate() - 1);
    let link = "/?date=" + newDay.toISOString().slice(0, 10).replace(/-/g, "");
    console.log(newDay.toISOString().slice(0, 10).replace(/-/g, ""));
    window.location = link;
  }

  function nextDate() {
    const today = new Date();
    const newDay = new Date(date);

    if (today.getDate() <= newDay.getDate()) {
      alert("No more content accessible");
    }
    else {
      newDay.setDate(newDay.getDate() + 1);
      let link = "/?date=" + newDay.toISOString().slice(0, 10).replace(/-/g, "");
      console.log(newDay.toISOString().slice(0, 10).replace(/-/g, ""));
      window.location = link;
    }
  }

  return (
    <div className="App">
      <h1>Astronomy Picture Of the Day</h1>
      <h1>{info.title}</h1>
      <p>{info.explanation}</p>
      <h4>{info.date}</h4>
      <img src={info.hdurl}></img>
      <button onClick={prevDate}>Previous</button>
      <button onClick={nextDate}>Next</button>
    </div>
  );
}

export default App;
