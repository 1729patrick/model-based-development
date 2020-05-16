import Model from '../../libraries/Model';

class Song extends Model {
  constructor(song = {}) {
    super('Song', song);

    this.id = song.id;
    this.name = song.name;
    this.album = song.album;
  }

  JSON() {
    return { id: this.id, name: this.name, album: this.album };
  }
}

export default Song;
