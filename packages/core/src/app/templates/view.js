export default `import React, { useState, useEffect, useMemo } from 'react';
import MaterialTable from 'material-table';

import api from '../../services/api';
import { toastSuccess, toastError } from '../../services/toast';
import Checkbox from '../../components/Checkbox';

const {{name}}s = () => {
  const [{{model}}s, set{{name}}s] = useState({});

  const getLookUp = async model => {
    const { data } = await api.get(${'`/${model}s`'});

    return new Promise(resolve => {
      resolve(
        data[${'`${model}s`'}].reduce((acc, model) => {
          acc[model.id] = model.name;

          return acc;
        }, {})
      );
    });
  };
  

  const getColumns = async columns => {
    let cols = [];

    for (const { field, type } of columns) {
      const title = field.split('_')[0];
      const editable = field === 'id' ? 'never' : 'always';

    
      const isModel = field.split('_').length === 2;
      if (isModel) {
        const lookup = await getLookUp(title);

        let column = {
          field,
          title,
          editable,
          type,
        };

        if (type === 'checkbox') {
          column = {
            ...column,
            editComponent: props => <Checkbox {...props} items={lookup} />,
            render: rowData => rowData[field].map(id => lookup[id]).join(', '),
          };
        } else {
          column = { ...column, lookup };
        }

        cols.push(column);
      } else {
        cols.push({ field, title, editable, type });
      }
    }

    return cols;
  };

  useEffect(() => {
    const fetch{{name}}s = async () => {
      const { data } = await api.get('/{{model}}s');

      set{{name}}s({ columns: await getColumns(data.columns), data: data.{{model}}s });
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
