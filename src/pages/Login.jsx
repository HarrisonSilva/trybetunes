import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import styles from '../styles/login/title.module.css';

export default class Login extends Component {
  state = {
    characters: '',
    controlBtn: true,
    loading: false,
    redirectUser: false,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const number3 = 3;
    this.setState({
      characters: value,
      controlBtn: value.length < number3,
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { characters } = this.state;
    await createUser({ name: characters });
    this.setState({
      loading: false,
      redirectUser: true,
    });
  };

  render() {
    const { characters, controlBtn, loading, redirectUser } = this.state;
    return (
      <div data-testid="page-login">
        {loading && <span>Carregando...</span>}
        {redirectUser && <Redirect to="/search" />}
        <form className={ styles.login }>
          <label htmlFor="nome">
            <input
              value={ characters }
              onChange={ this.handleChange }
              id="nome"
              type="text"
              data-testid="login-name-input"
            />
          </label>
          <button
            onClick={ this.handleClick }
            disabled={ controlBtn }
            type="submit"
            data-testid="login-submit-button"
          >
            Entrar

          </button>
        </form>
        <img className={ styles.music } src="/music.png" alt="music png" />
      </div>
    );
  }
}
