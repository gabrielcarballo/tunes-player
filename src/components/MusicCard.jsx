import { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { song, favoritedSongs /* getList */ } = this.props;

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
            /* defaultChecked={
              getList.length > 0 && getList.some((fav) => fav.trackId === song.trackId)
} */
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  favoritedSongs: PropTypes.shape().isRequired,
  song: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
