import Song from '../models/Song';

class SongController {
  async index(_, res) {
    const song = new Song();

    const songs = await song.findAll();
    const columns = song.columns;

    return res.json({ columns, songs });
  }

  async store(req, res) {
    try {
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }

      const song = await new Song(req.body).insert();

      return res.json(song);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async update(req, res) {
    try {
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }

      const { songId } = req.params;

      const song = await new Song().update({ id: songId }, req.body);

      return res.json(song);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async delete(req, res) {
    try {
      const { songId } = req.params;

      await new Song().delete({ id: songId });

      return res.send();
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async findOne(req, res) {
    const { songId } = req.params;
    const song = (await new Song().findBy({ id: songId }))[0];

    return res.json(song);
  }
}

export default new SongController();