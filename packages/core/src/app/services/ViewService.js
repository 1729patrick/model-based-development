import Mustache from 'mustache';

import fs, { link } from 'fs';
import { resolve } from 'path';

import { VIEW_PATH } from '../../config/path';
import viewTemplate from '../templates/view';

class ViewService {
  async run({ args }) {
    const page = Mustache.render(viewTemplate, args);

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
    const linksPath = resolve(VIEW_PATH, 'routes', 'index.js');
    const links = fs.readFileSync(linksPath, 'utf8');

    const appRoutesWithImport = links.replace(
      "import Home from '../pages/Home';",
      `import ${name}s from '../pages/${name}s';\nimport Home from '../pages/Home';`
    );

    const appRoutesWithExport = appRoutesWithImport.replace(
      '</Switch>',
      `  <Route exact path="/${model}s" component={${name}s}></Route>
      </Switch>`
    );

    fs.writeFileSync(linksPath, appRoutesWithExport, () => {});
  }
}

export default new ViewService();
