import { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;