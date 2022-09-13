import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    searchState: '',
    APIresponse: false,
    songs: [],
    albumFetched: '',
  };

  handleSearchState = (event) => {
    const { target: { value } } = event;
    this.setState({
      searchState: value,
    });
  };

  handleSearch = async () => {
    const { searchState } = this.state;
    this.setState({
      APIresponse: true,
    }, async () => {
      const songListFetch = await searchAlbumsAPI(searchState);
      this.setState({
        APIresponse: false,
        songs: songListFetch,
      });
    });
    this.setState({ albumFetched: searchState });
    this.setState({ searchState: '' });
  };

  render() {
    const { songs, searchState, APIresponse, albumFetched } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { APIresponse ? <Loading /> : (
          <>
            <input
              type="text"
              placeholder="Pesquisar"
              data-testid="search-artist-input"
              value={ searchState }
              name="search"
              onChange={ this.handleSearchState }
            />
            <button
              type="submit"
              disabled={ searchState.length < 2 }
              data-testid="search-artist-button"
              onClick={ this.handleSearch }
            >
              Pesquisar
            </button>
          </>
        )}
        {songs.length ? (
          <ol>
            <p>
              Resultado de álbuns de:
              {' '}
              { albumFetched }
            </p>
            {songs.map((song) => (
              <li key={ `${song.collectionId}` }>
                <div>
                  <h3>{`Álbum ${song.collectionName}`}</h3>
                  <span>{ `Artista ${song.artistName}` }</span>
                  <img src={ song.artworkUrl100 } alt={ song.artistName } />
                  <Link
                    to={ `/album/${song.collectionId}` }
                    data-testid={ `link-to-album-${song.collectionId}` }
                  >
                    <br />
                    Visualizar Álbum
                  </Link>
                </div>
              </li>
            ))}

          </ol>
        ) : <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}

export default Search;
