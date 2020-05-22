import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

import api from '../../services/api';

const Songs = () => {
  const [songs, setSongs] = useState({});

  const getColumns = data => {
    const [firstRow] = data;

    return Object.entries(firstRow).map(([field]) => {
      const title = field.replace('_', '');
      return { field, title };
    });
  };

  useEffect(() => {
    const fetchSongs = async () => {
      const { data } = await api.get('/songs');
      setSongs({ columns: getColumns(data), data });
    };

    fetchSongs();
  }, []);

  const onRowAdd = async newData => {
    setSongs(prevState => {
      const data = [...prevState.data];
      data.push(newData);
      return { ...prevState, data };
    });
  };

  const onRowUpdate = async (newData, oldData) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        if (oldData) {
          setSongs(prevState => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = newData;
            return { ...prevState, data };
          });
        }
      }, 600);
    });

  const onRowDelete = async oldData =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        setSongs(prevState => {
          const data = [...prevState.data];
          data.splice(data.indexOf(oldData), 1);
          return { ...prevState, data };
        });
      }, 600);
    });

  return (
    <MaterialTable
      title="Songs"
      columns={songs.columns}
      data={songs.data}
      editable={{ onRowAdd, onRowUpdate, onRowDelete }}
    />
  );
};

export default Songs;
