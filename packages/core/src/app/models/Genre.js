import Model from '../../libraries/Model';

class Genre extends Model {
  constructor(genre = {}) {
    super('Genre', genre);

    this.id = genre.id;
		this.name = genre.name;
  }

  get columns() {
    return [
      { field: 'id', type: 'numeric' },
			{ field: 'name', type: 'string' },
    ];
  }
}

export default Genre;