import Song from '../models/Song';

class SongController {
  async index(_, res) {
    const songs = await new Song().findAll();

    return res.json(songs);
  }

  async store(req, res) {
    const song = await new Song(req.body).insert();

    return res.json(song);
  }

  async update(req, res) {
    const { songId } = req.params;

    const song = await new Song().update({ id: songId }, req.body);

    return res.json(song);
  }

  async delete(req, res) {
    const { songId } = req.params;

    await new Song().delete({ id: songId });

    return res.send();
  }

  async findOne(req, res) {
    const { songId } = req.params;
    const song = await new Song().findBy({ id: songId });

    return res.json(song);
  }
}

export default new SongController();
