import Model from '../../libraries/Model';

class Song extends Model {
  constructor(song = {}) {
    super('Song', song);

    this.id = song.id;
		this.userIdEmail = song.userIdEmail;
		this.password = song.password;
		this.rememberMe = song.rememberMe;
  }

  JSON() {
    return {
      id: this.id,
			userIdEmail: this.userIdEmail,
			password: this.password,
			rememberMe: this.rememberMe,
    };
  }
}

export default Song;