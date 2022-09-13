import { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { song } = this.props;

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
      </div>
    );
  }
}

export default MusicCard;
