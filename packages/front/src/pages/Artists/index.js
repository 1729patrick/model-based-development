import React, { useState, useEffect, useMemo } from 'react';
import MaterialTable from 'material-table';

import api from '../../services/api';
import { toastSuccess, toastError } from '../../services/toast';

const Artists = () => {
  const [artists, setArtists] = useState({});

  const getColumns = columns => {
    return columns.map(({ field, type }) => {
      const title = field.replace(/_/g, ' ');
      const editable = field === 'id' ? 'never' : 'always';

      return { field, title, editable, type };
    });
  };

  useEffect(() => {
    const fetchArtists = async () => {
      const { data } = await api.get('/artists');

      setArtists({ columns: getColumns(data.columns), data: data.artists });
    };

    fetchArtists();
  }, []);

  const onRowAdd = async newData => {
    try {
      const response = await api.post('/artists', newData);

      setArtists(prevState => {
        const data = [...prevState.data];
        data.push({ ...newData, id: response.data[0] });
        return { ...prevState, data };
      });

      toastSuccess('Artist created with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const onRowUpdate = async (newData, oldData) => {
    try {
      await api.put(`/artists/${oldData.id}`, newData);

      setArtists(prevState => {
        const data = [...prevState.data];
        data[data.indexOf(oldData)] = newData;
        return { ...prevState, data };
      });

      toastSuccess('Artist updated with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const onRowDelete = async oldData => {
    try {
      await api.delete(`/artists/${oldData.id}`);

      setArtists(prevState => {
        const data = [...prevState.data];
        data.splice(data.indexOf(oldData), 1);
        return { ...prevState, data };
      });

      toastSuccess('Artist deleted with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const editable = useMemo(() => ({ onRowAdd, onRowUpdate, onRowDelete }), []);
  const options = useMemo(() => ({ actionsColumnIndex: -1 }), []);
  const { columns, data } = useMemo(() => artists, [ artists ]);

  return (
    <MaterialTable
      title="Artists"
      columns={columns}
      data={data}
      editable={editable}
      options={options}
    />
  );
};

export default Artists;
