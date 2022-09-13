import { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { song, favoritedSongs, gettingList } = this.props;

    return (
      <div>
        <span>{ song.trackName }</span>
        <audio
          data-testid="audio-component"
          src={ song.previewUrl }
          controls
        >
          <track
            kind="captions"
          />
          O seu navegador não suporta o elemento
          {' '}
          <code>
            audio
          </code>
        </audio>
        <label htmlFor="fav-button">
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${song.trackId}` }
            onClick={ () => favoritedSongs(song) }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
