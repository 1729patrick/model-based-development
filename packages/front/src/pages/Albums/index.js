import React, { useState, useEffect, useMemo } from 'react';
import MaterialTable from 'material-table';

import api from '../../services/api';
import { toastSuccess, toastError } from '../../services/toast';

const Albums = () => {
  const [albums, setAlbums] = useState({});

  const getColumns = columns => {
    return columns.map(({ field, type }) => {
      const title = field.replace(/_/g, ' ');
      const editable = field === 'id' ? 'never' : 'always';

      return { field, title, editable, type };
    });
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      const { data } = await api.get('/albums');

      setAlbums({ columns: getColumns(data.columns), data: data.albums });
    };

    fetchAlbums();
  }, []);

  const onRowAdd = async newData => {
    try {
      const response = await api.post('/albums', newData);

      setAlbums(prevState => {
        const data = [...prevState.data];
        data.push({ ...newData, id: response.data[0] });
        return { ...prevState, data };
      });

      toastSuccess('Album created with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const onRowUpdate = async (newData, oldData) => {
    try {
      await api.put(`/albums/${oldData.id}`, newData);

      setAlbums(prevState => {
        const data = [...prevState.data];
        data[data.indexOf(oldData)] = newData;
        return { ...prevState, data };
      });

      toastSuccess('Album updated with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const onRowDelete = async oldData => {
    try {
      await api.delete(`/albums/${oldData.id}`);

      setAlbums(prevState => {
        const data = [...prevState.data];
        data.splice(data.indexOf(oldData), 1);
        return { ...prevState, data };
      });

      toastSuccess('Album deleted with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const editable = useMemo(() => ({ onRowAdd, onRowUpdate, onRowDelete }), []);
  const options = useMemo(() => ({ actionsColumnIndex: -1 }), []);
  const { columns, data } = useMemo(() => albums, [ albums ]);

  return (
    <MaterialTable
      title="Albums"
      columns={columns}
      data={data}
      editable={editable}
      options={options}
    />
  );
};

export default Albums;
