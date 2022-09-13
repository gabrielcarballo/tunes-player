import { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    searchState: '',
  };

  handleSeachState = (event) => {
    const { target: { value } } = event;
    this.setState({
      searchState: value,
    });
  };

  render() {
    const { searchState } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

        <input
          type="text"
          placeholder="Pesquisar"
          data-testid="search-artist-input"
          value={ searchState }
          name="search"
          onChange={ this.handleSeachState }
        />
        <button
          type="submit"
          disabled={ searchState.length < 2 }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
