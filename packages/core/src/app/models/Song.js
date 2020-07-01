import Model from '../../libraries/Model';

class Song extends Model {
  constructor(song = {}) {
    super('Song', song);

    this.id = song.id;
		this.name = song.name;
		this.album_id = song.album_id;
		this.genre_id = song.genre_id;
		this.artist_id = song.artist_id;
  }

  get columns() {
    return [
      { field: 'id', type: 'numeric' },
			{ field: 'name', type: 'string' },
			{ field: 'album_id', type: 'numeric' },
			{ field: 'genre_id', type: 'numeric' },
			{ field: 'artist_id', type: 'numeric' },
    ];
  }

  findAll() {
    let join = (database, tableName) =>
      database
        .select(['Song.*', 'SongGenre.genre_id', 'SongArtist.artist_id'])
        .from(tableName)
				.leftJoin('SongGenre', 'Song.id', 'SongGenre.song_id')
				.leftJoin('SongArtist', 'Song.id', 'SongArtist.song_id');

    return super.findAll(join);
  }
}

export default Song;