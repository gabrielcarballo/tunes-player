import { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    login: '',
    loginStarted: false,
    loginFinished: false,
  };

  handleLogin = (event) => {
    const { target: { value } } = event;
    this.setState({
      login: value,
    });
  };

  handleSubmit = () => {
    const { login } = this.state;
    this.setState({ loginStarted: true }, async () => {
      await createUser({ name: login });
      this.setState({ loginFinished: true });
    });
  };

  render() {
    const limit = 3;
    const { login, loginFinished, loginStarted } = this.state;

    if (loginStarted && loginFinished === false) return <Loading />;
    if (loginStarted && loginFinished) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.handleLogin }
        />
        <input
          type="button"
          data-testid="login-submit-button"
          value="Entrar"
          disabled={ login.length < limit }
          onClick={ this.handleSubmit }
        />
      </div>
    );
  }
}

export default Login;
