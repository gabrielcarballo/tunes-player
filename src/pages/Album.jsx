import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    songList: [],
    songInfo: [],
    favoritedSongs: [],
    loading: false,
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
    this.favoriteSongs();
  }

  favoriteSongs = async (song) => {
    const { favoritedSongs } = this.state;
    this.setState({
      loading: true,
    });
    const test = await getFavoriteSongs(song);
    await addSong(song);
    this.setState({
      loading: false,
      favoritedSongs: test,
    });
    if (favoritedSongs.some((song1) => song1.trackId === song.trackId)) {
      await removeSong(song);
      this.setState({
        favoritedSongs: test,
      });
    }
  };

  render() {
    const { songInfo, songList, favoritedSongs, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{songInfo.artistName}</h1>
        <h1 data-testid="album-name">{songInfo.collectionName}</h1>
        <img src={ songInfo.artworkUrl100 } alt={ songInfo.collectionName } />
        <ol>
          {loading && <Loading />}
          {songList.map((song) => (
            <li key={ song }>
              <MusicCard
                song={ song }
                favoritedSongs={ this.favoriteSongs }
                getList={ favoritedSongs }

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
