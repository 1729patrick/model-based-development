import Genre from '../models/Genre';

class GenreController {
  async index(_, res) {
    const genre = new Genre();

    const genres = await genre.findAll();
    const columns = genre.columns;

    return res.json({ columns, genres });
  }

  async store(req, res) {
    try {
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }

      const genre = await new Genre(req.body).insert();

      return res.json(genre);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async update(req, res) {
    try {
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }

      const { genreId } = req.params;

      const genre = await new Genre().update({ id: genreId }, req.body);

      return res.json(genre);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async delete(req, res) {
    try {
      const { genreId } = req.params;

      await new Genre().delete({ id: genreId });

      return res.send();
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async findOne(req, res) {
    const { genreId } = req.params;
    const genre = (await new Genre().findBy({ id: genreId }))[0];

    return res.json(genre);
  }
}

export default new GenreController();