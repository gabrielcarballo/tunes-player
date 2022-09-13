import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong} from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    songList: [],
    songInfo: [],
    favoritedSongs: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const test = await getMusics(id);
    console.log(test);
    const fetchSongList = test.slice([1]);
    this.setState({
      songInfo: test[0],
      songList: fetchSongList,
    });
  }

  favoriteSongs = async (song) => {
    const { favoritedSongs } = this.state;
    const favoritedList = await getFavoriteSongs();
    if (favoritedSongs.includes(song)) {
      (await removeSong(song));
      console.log('foi');
    } else {
      (await addSong(song));
      console.log('foi 1');
    }
    this.setState({
      favoritedSongs: favoritedList,
    });
  };

  render() {
    const { songInfo, songList, favoritedSongs } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{songInfo.artistName}</h1>
        <h1 data-testid="album-name">{songInfo.collectionName}</h1>
        <img src={ songInfo.artworkUrl100 } alt={ songInfo.collectionName } />
        <ol>
          {songList.map((song) => (
            <li key={ song }>
              <MusicCard
                song={ song }
                favoritedSongs={ this.favoriteSongs }
                gettingList={ favoritedSongs }

              />
            </li>))}
        </ol>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
