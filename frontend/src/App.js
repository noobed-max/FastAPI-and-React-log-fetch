import { useEffect, useState } from "react";
import "./App.css";
import config from './config.json';

function App() {
  const [data, setData] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = () => {
    fetch(config.react.fastapi_url)
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

  const filterData = () => {
    if (startDate && endDate && startDate > endDate) {
      setData([]);
    } else if (startDate || endDate) {
      const start = startDate ? new Date(startDate.split('/').reverse().join('-')) : new Date(0);
      const end = endDate ? new Date(endDate.split('/').reverse().join('-')) : new Date();
      const filteredData = data.filter(item => {
        const itemDate = new Date(item.date.split('/').reverse().join('-'));
        return itemDate >= start && itemDate <= end;
      });
      setData(filteredData);
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
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={filterData}>Filter</button>
      <button onClick={startFetching}>Start Fetching</button>
      <button onClick={stopFetching}>Stop Fetching</button>

      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">IP Address</div>
          <div className="col col-2">Date</div>
          <div className="col col-3">Time</div>
        </li>
        {data.map((item, index) => (
          <li className="table-row" key={index}>
            <div className="col col-1" data-label="IP Address">
              {item.ip_address}
            </div>
            <div className="col col-2" data-label="Date">
              {item.date}
            </div>
            <div className="col col-3" data-label="Time">
              {item.time}
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

