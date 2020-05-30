export default `import React, { useState, useEffect, useMemo } from 'react';
import MaterialTable from 'material-table';

import api from '../../services/api';
import { toastSuccess, toastError } from '../../services/toast';

const {{name}}s = () => {
  const [{{model}}s, set{{name}}s] = useState({});

  const getColumns = columns => {
    return columns.map(({ field, type }) => {
      const title = field.replace(/_/g, ' ');
      const editable = field === 'id' ? 'never' : 'always';

      return { field, title, editable, type };
    });
  };

  useEffect(() => {
    const fetch{{name}}s = async () => {
      const { data } = await api.get('/{{model}}s');

      set{{name}}s({ columns: getColumns(data.columns), data: data.{{model}}s });
    };

    fetch{{name}}s();
  }, []);

  const onRowAdd = async newData => {
    try {
      const response = await api.post('/{{model}}s', newData);

      set{{name}}s(prevState => {
        const data = [...prevState.data];
        data.push({ ...newData, id: response.data[0] });
        return { ...prevState, data };
      });

      toastSuccess('{{name}} created with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const onRowUpdate = async (newData, oldData) => {
    try {
      await api.put(${'`/{{model}}s/${oldData.id}`'}, newData);

      set{{name}}s(prevState => {
        const data = [...prevState.data];
        data[data.indexOf(oldData)] = newData;
        return { ...prevState, data };
      });

      toastSuccess('{{name}} updated with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const onRowDelete = async oldData => {
    try {
      await api.delete(${'`/{{model}}s/${oldData.id}`'});

      set{{name}}s(prevState => {
        const data = [...prevState.data];
        data.splice(data.indexOf(oldData), 1);
        return { ...prevState, data };
      });

      toastSuccess('{{name}} deleted with success. 🥳');
    } catch (e) {
      toastError('Try again. 🥺');
    }
  };

  const editable = useMemo(() => ({ onRowAdd, onRowUpdate, onRowDelete }), []);
  const options = useMemo(() => ({ actionsColumnIndex: -1 }), []);
  const { columns, data } = useMemo(() => {{model}}s, [ {{model}}s ]);

  return (
    <MaterialTable
      title="{{name}}s"
      columns={columns}
      data={data}
      editable={editable}
      options={options}
    />
  );
};

export default {{name}}s;
`;
