import Model from '../../libraries/Model';

class Song extends Model {
  constructor(song = {}) {
    super('Song', song);

    this.id = song.id;
		this.name = song.name;
  }

  JSON() {
    return {
      id: this.id,
			name: this.name,
    };
  }
}

export default Song;