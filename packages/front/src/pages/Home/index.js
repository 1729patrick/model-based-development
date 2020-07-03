import React, { useEffect, useState } from 'react';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import models from './models';
import api from '../../services/api';

function Home() {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const results = await Promise.all(
        models.map(model => api.get(`/${model}`))
      );

      const dataFormatted = results.map(({ data, config }) => {
        const name = config.url.replace('/', '');
        return { name, Rows: data[name.toLowerCase()]?.length || 0 };
      });

      setBarChartData(dataFormatted);
    };

    fetch();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ marginBottom: 60 }}>Musics 🎶</h1>

      {models.length > 0 && (
        <div style={{ display: 'flex' }}>
          <BarChart
            width={500}
            height={300}
            data={barChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Rows" fill="#8884d8" />
          </BarChart>
        </div>
      )}
    </div>
  );
}

export default Home;
