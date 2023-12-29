// first one 
import React, { useState } from 'react';

function App() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/logs');
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div>
      <h1>Access Logs</h1>
      <button onClick={fetchLogs}>Fetch Logs</button>
      {logs.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Date Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.ip_address}</td>
                <td>{log.date_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;


/* another
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://127.0.0.1:8000/logs',
      );
 
      setData(result.data);
    };
 
    fetchData();
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Date Time</th>
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
*/


/* Sadiyas

import React, { useState } from 'react';
import axios from 'axios';

const QueryComponent = () => {
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');

  const handleQuery = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/logs', {
        params: { param1, param2 },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error querying FastAPI:', error);
    }
  };

  return (
    <div>
      <label>
        Param 1:
        <input type="text" value={param1} onChange={(e) => setParam1(e.target.value)} />
      </label>
      <label>
        Param 2:
        <input type="number" value={param2} onChange={(e) => setParam2(e.target.value)} />
      </label>
      <button onClick={handleQuery}>Query FastAPI</button>
    </div>
  );
};

export default QueryComponent;
*/