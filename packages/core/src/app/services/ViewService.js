import Mustache from 'mustache';

import fs, { link } from 'fs';
import { resolve } from 'path';

import { VIEW_PATH } from '../../config/path';

class ViewService {
  async run({ args }) {
    const page = Mustache.render(
      `import React, { useState, useEffect, useMemo } from 'react';
import MaterialTable from 'material-table';

import api from '../../services/api';
import { toastSuccess, toastError } from '../../services/toast';

const {{name}}s = () => {
  const [{{model}}s, set{{name}}s] = useState({});

  const getColumns = columns => {
    return columns.map((field) => {
      const title = field.replace('_', '');
      const editable = field === 'id' ? 'never' : 'always';

      return { field, title, editable };
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
`,
      args
    );

    const pagePath = resolve(VIEW_PATH, 'pages', `${args.name}s`);

    if (!fs.existsSync(pagePath)) {
      fs.mkdirSync(pagePath);
    }

    fs.writeFileSync(resolve(pagePath, `index.js`), page);
    this.addLinkInHeader(args);
    this.addRouteInRouter(args);

    return page;
  }

  addLinkInHeader({ name, model }) {
    const linksPath = resolve(VIEW_PATH, 'components', 'layout', 'Links.js');
    const links = fs.readFileSync(linksPath, 'utf8');

    const appRouterIndented = links.replace(
      '<></>',
      `(
    <>
    </>
  )`
    );

    const appRoutesWithExport = appRouterIndented.replace(
      '</>',
      `  <NavLink
        to="/${model}s"
        style={styles.navLink}
        activeStyle={styles.navLinkActive}
      >
        <Button color="inherit">${name}s</Button>
      </NavLink>
    </>`
    );

    fs.writeFileSync(linksPath, appRoutesWithExport, () => {});
  }

  addRouteInRouter({ name, model }) {
    const linksPath = resolve(VIEW_PATH, 'routes', 'Router.js');
    const links = fs.readFileSync(linksPath, 'utf8');

    const appRoutesWithImport = `import ${name}s from '../pages/${name}s';\n${links}`;

    const appRouterIndented = appRoutesWithImport.replace(
      '<></>',
      `(
    <>
    </>
  )`
    );

    const appRoutesWithExport = appRouterIndented.replace(
      '</>',
      `  <Route exact path="/${model}s" component={${name}s}></Route>
    </>`
    );

    fs.writeFileSync(linksPath, appRoutesWithExport, () => {});
  }
}

export default new ViewService();
