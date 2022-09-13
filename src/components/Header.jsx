import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    username: '',
    ready: false,
  };

  componentDidMount() {
    this.user();
  }

  user = () => {
    this.setState({
      ready: true,
    }, async () => {
      const test = await getUser();
      this.setState({
        username: test,
        ready: false,
      });
    });
  };

  render() {
    const { username, ready } = this.state;
    return (
      <header data-testid="header-component">
        { ready ? (
          <Loading />
        ) : (
          <h4 data-testid="header-user-name">{ username.name }</h4>
        )}
        <nav>
          <p>
            Pesquisa
            <Link
              to="/search"
              data-testid="link-to-search"
            />
          </p>
          <p>
            Favoritos
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            />
          </p>
          <p>
            Perfil
            <Link
              to="/profile"
              data-testid="link-to-profile"
            />
          </p>
        </nav>
      </header>
    );
  }
}

export default Header;
