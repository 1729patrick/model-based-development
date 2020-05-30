export default `import {{name}} from '../models/{{name}}';

class {{name}}Controller {
  async index(_, res) {
    const {{model}} = new {{name}}();

    const {{model}}s = await {{model}}.findAll();
    const columns = {{model}}.columns;

    return res.json({ columns, {{model}}s });
  }

  async store(req, res) {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    const {{model}} = await new {{name}}(req.body).insert();

    return res.json({{model}});
  }

  async update(req, res) {
    const { {{model}}Id } = req.params;

    const {{model}} = await new {{name}}().update({ id: {{model}}Id }, req.body);

    return res.json({{model}});
  }

  async delete(req, res) {
    const { {{model}}Id } = req.params;

    await new {{name}}().delete({ id: {{model}}Id });

    return res.send();
  }

  async findOne(req, res) {
    const { {{model}}Id } = req.params;
    const {{model}} = (await new {{name}}().findBy({ id: {{model}}Id }))[0];

    return res.json({{model}});
  }
}

export default new {{name}}Controller();`;
