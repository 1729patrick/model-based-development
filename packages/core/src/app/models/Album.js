import Model from '../../libraries/Model';

class Album extends Model {
  constructor(album = {}) {
    super('Album', album);

    this.id = album.id;
		this.name = album.name;
		this.released = album.released;
  }

  get columns() {
    return [
      { field: 'id', type: 'numeric' },
			{ field: 'name', type: 'string' },
			{ field: 'released', type: 'date' },
    ];
  }
}

export default Album;