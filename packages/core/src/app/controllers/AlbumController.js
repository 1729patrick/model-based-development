import Album from '../models/Album';

class AlbumController {
  async index(_, res) {
    const album = new Album();

    const albums = await album.findAll();
    const columns = album.columns;

    return res.json({ columns, albums });
  }

  async store(req, res) {
    try {
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }

      const album = await new Album(req.body).insert();

      return res.json(album);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async update(req, res) {
    try {
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }

      const { albumId } = req.params;

      const album = await new Album().update({ id: albumId }, req.body);

      return res.json(album);
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async delete(req, res) {
    try {
      const { albumId } = req.params;

      await new Album().delete({ id: albumId });

      return res.send();
    } catch ({ message }) {
      return res.status(400).json({ error: message });
    }
  }

  async findOne(req, res) {
    const { albumId } = req.params;
    const album = (await new Album().findBy({ id: albumId }))[0];

    return res.json(album);
  }
}

export default new AlbumController();