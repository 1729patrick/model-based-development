import React, { useState, useEffect, useMemo } from 'react';
import MaterialTable from 'material-table';

import api from '../../services/api';
import { toastSuccess, toastError } from '../../services/toast';

const Songs = () => {
  const [songs, setSongs] = useState({});

  const getColumns = data => {
    const [firstRow] = data;

    return Object.entries(firstRow).map(([field]) => {
      const title = field.replace('_', '');
      const editable = field === 'id' ? 'never' : 'always';

      return { field, title, editable };
    });
  };

  useEffect(() => {
    const fetchSongs = async () => {
      const { data } = await api.get('/songs');

      if (!data.length) return;

      setSongs({ columns: getColumns(data), data });
    };

    fetchSongs();
  }, []);

  const onRowAdd = async newData => {
    try {
      const response = await api.post('/songs', newData);

      setSongs(prevState => {
        const data = [...prevState.data];
        data.push({ ...newData, id: response.data[0] });
        return { ...prevState, data };
      });

      toastSuccess('Song created with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const onRowUpdate = async (newData, oldData) => {
    try {
      await api.put(`/songs/${oldData.id}`, newData);

      setSongs(prevState => {
        const data = [...prevState.data];
        data[data.indexOf(oldData)] = newData;
        return { ...prevState, data };
      });

      toastSuccess('Song updated with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const onRowDelete = async oldData => {
    try {
      await api.delete(`/songs/${oldData.id}`);

      setSongs(prevState => {
        const data = [...prevState.data];
        data.splice(data.indexOf(oldData), 1);
        return { ...prevState, data };
      });

      toastSuccess('Song deleted with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const editable = useMemo(() => ({ onRowAdd, onRowUpdate, onRowDelete }), []);
  const options = useMemo(() => ({ actionsColumnIndex: -1 }), []);
  const { columns, data } = useMemo(() => songs, [ songs ]);

  return (
    <MaterialTable
      title="Song"
      columns={columns}
      data={data}
      editable={editable}
      options={options}
    />
  );
};

export default Songs;
