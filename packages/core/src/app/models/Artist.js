import Model from '../../libraries/Model';

class Artist extends Model {
  constructor(artist = {}) {
    super('Artist', artist);

    this.id = artist.id;
		this.name = artist.name;
		this.date_of_birth = artist.date_of_birth;
		this.nacionality = artist.nacionality;
		this.description = artist.description;
  }

  get columns() {
    return [
      { field: 'id', type: 'numeric' },
			{ field: 'name', type: 'string' },
			{ field: 'date_of_birth', type: 'date' },
			{ field: 'nacionality', type: 'string' },
			{ field: 'description', type: 'string' },
    ];
  }
}

export default Artist;