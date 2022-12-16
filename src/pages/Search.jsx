import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    music: '',
    controlBtn: true,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const number2 = 2;
    this.setState({
      music: value,
      controlBtn: value.length < number2,
    });
  };

  render() {
    const { music, controlBtn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="pesquisa">
            <input
              value={ music }
              onChange={ this.handleChange }
              id="pesquisa"
              type="text"
              data-testid="search-artist-input"
            />
          </label>
          <button
            disabled={ controlBtn }
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
