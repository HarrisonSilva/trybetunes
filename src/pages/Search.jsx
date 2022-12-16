import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    music: '',
    controlBtn: true,
    loading: false,
    albun: [],
    isFoundAlbum: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const number2 = 2;
    this.setState({
      music: value,
      controlBtn: value.length < number2,
    });
  };

  handFoundMusic = async (albuns, texts) => {
    this.setState({
      loading: false,
      albun: albuns,
      isFoundAlbum: texts,
    });
  };

  hundleNotFountMusic = async (albuns, text) => {
    this.setState({
      loading: false,
      albun: albuns,
      isFoundAlbum: text,
    });
  };

  handleClick = async () => {
    const { music } = this.state;
    const albuns = await searchAlbumsAPI(music);
    this.setState({ loading: true, music: '' });
    if (albuns.length) {
      await this.handFoundMusic(albuns, '');
    } else {
      await this.hundleNotFountMusic(albuns, 'Nenhum álbum foi encontrado');
    }
  };

  render() {
    const { isFoundAlbum, loading, music, controlBtn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading && <p>Carregando...</p> }
        {isFoundAlbum}
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
            onClick={ this.handleClick }
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
