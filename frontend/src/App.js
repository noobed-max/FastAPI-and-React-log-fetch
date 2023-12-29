import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Access Logs</h1>
      <button onClick={fetchData}>Fetch Logs</button>
      <table>
        <thead>
          <tr>
            <th>IPaddress</th>
            <th>Date and Time</th>
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
  );
}

export default App;


