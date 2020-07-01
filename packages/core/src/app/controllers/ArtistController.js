import Artist from '../models/Artist';

class ArtistController {
  async index(_, res) {
    const artist = new Artist();

    const artists = await artist.findAll();
    const columns = artist.columns;

    return res.json({ columns, artists });
  }

  async store(req, res) {
    try {
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }

      const artist = await new Artist(req.body).insert();

      return res.json(artist);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async update(req, res) {
    try {
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }

      const { artistId } = req.params;

      const artist = await new Artist().update({ id: artistId }, req.body);

      return res.json(artist);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async delete(req, res) {
    try {
      const { artistId } = req.params;

      await new Artist().delete({ id: artistId });

      return res.send();
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async findOne(req, res) {
    const { artistId } = req.params;
    const artist = (await new Artist().findBy({ id: artistId }))[0];

    return res.json(artist);
  }
}

export default new ArtistController();