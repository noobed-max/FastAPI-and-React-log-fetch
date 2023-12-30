import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  const fetchData = () => {
    fetch(`http://127.0.0.1:8000/logs`)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setData(actualData);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const startFetching = () => {
    if (!intervalId) {
      fetchData();
      const id = setInterval(fetchData, 5000); // fetch every 5 seconds
      setIntervalId(id);
    }
  };

  const stopFetching = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="container">
      <h2 style={{ color: '#00FFEF' }}>Access Logs </h2>
      <button onClick={startFetching}>Start Fetching</button>
      <button onClick={stopFetching}>Stop Fetching</button>

      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">IP Address</div>
          <div className="col col-2">Date and Time</div>
        </li>
        {data.map((item, index) => (
          <li className="table-row" key={index}>
            <div className="col col-1" data-label="IP Address">
              {item.ip_address}
            </div>
            <div className="col col-2" data-label="Date and Time">
              {item.date_time}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

  /*un comment for OG bruhhhhh!
  return (
    <div className="App">
      <h1>Access Logs</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>IPaddress</th>
              <th>DateandTime</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.ip_address}</td>
                <td>{item.date_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}*/

