import React, { useState, useEffect, useMemo } from 'react';
import MaterialTable from 'material-table';

import api from '../../services/api';
import { toastSuccess, toastError } from '../../services/toast';

const Genres = () => {
  const [genres, setGenres] = useState({});

  const getColumns = columns => {
    return columns.map(({ field, type }) => {
      const title = field.replace(/_/g, ' ');
      const editable = field === 'id' ? 'never' : 'always';

      return { field, title, editable, type };
    });
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await api.get('/genres');

      setGenres({ columns: getColumns(data.columns), data: data.genres });
    };

    fetchGenres();
  }, []);

  const onRowAdd = async newData => {
    try {
      const response = await api.post('/genres', newData);

      setGenres(prevState => {
        const data = [...prevState.data];
        data.push({ ...newData, id: response.data[0] });
        return { ...prevState, data };
      });

      toastSuccess('Genre created with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const onRowUpdate = async (newData, oldData) => {
    try {
      await api.put(`/genres/${oldData.id}`, newData);

      setGenres(prevState => {
        const data = [...prevState.data];
        data[data.indexOf(oldData)] = newData;
        return { ...prevState, data };
      });

      toastSuccess('Genre updated with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const onRowDelete = async oldData => {
    try {
      await api.delete(`/genres/${oldData.id}`);

      setGenres(prevState => {
        const data = [...prevState.data];
        data.splice(data.indexOf(oldData), 1);
        return { ...prevState, data };
      });

      toastSuccess('Genre deleted with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const editable = useMemo(() => ({ onRowAdd, onRowUpdate, onRowDelete }), []);
  const options = useMemo(() => ({ actionsColumnIndex: -1 }), []);
  const { columns, data } = useMemo(() => genres, [ genres ]);

  return (
    <MaterialTable
      title="Genres"
      columns={columns}
      data={data}
      editable={editable}
      options={options}
    />
  );
};

export default Genres;
