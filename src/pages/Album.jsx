import { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    songList: [],
    songInfo: [],
  };

  async componentDidMount() {
    const { match: {params: { id } } } = this.props;
    const test = await getMusics(id);
    console.log(test);
    const fetchSongList = test.slice([1]);
    this.setState({
      songInfo: test[0],
      songList: fetchSongList,
    });
  }

  render() {
    const { songInfo, songList } = this.state;
    console.log(songList);
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{songInfo.artistName}</h1>
        <h1 data-testid="album-name">{songInfo.collectionName}</h1>
        <img src={ songInfo.artworkUrl100 } alt={ songInfo.collectionName } />
        <ol>
          {songList.map((song) => (
            <li key={ song }><MusicCard song={ song } /></li>))}
        </ol>
      </div>
    );
  }
}

export default Album;
