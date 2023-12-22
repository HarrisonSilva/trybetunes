import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import styles from '../styles/login/title.module.css';

export default class Search extends Component {
  state = {
    music: '',
    controlBtn: true,
    loading: false,
    albun: [],
    isFoundAlbum: '',
    artistName: '',

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
    this.setState({ loading: true, artistName: music, music: '' });
    if (albuns.length) {
      await this.handFoundMusic(albuns, '');
    } else {
      await this.hundleNotFountMusic([], 'Nenhum álbum foi encontrado');
    }
  };

  render() {
    const result = 'Resultado de álbuns de:';
    const { isFoundAlbum, loading, music, controlBtn, albun, artistName } = this.state;
    const albumList = albun.map((item, index) => (
      <div key={ index } className={ styles.container }>
        <Link
          to={ `/album/${item.collectionId}` }
          data-testid={ `link-to-album-${item.collectionId}` }
        >
          <p>{item.artistName}</p>
          <img src={ item.artworkUrl100 } alt={ item.collectionName } />
          <p>{item.collectionName}</p>
        </Link>
      </div>

    ));
    return (
      <div data-testid="page-search">
        <Header />
        {loading && <p>Carregando...</p> }
        {isFoundAlbum}
        <form>
          <label htmlFor="pesquisa">
            <input
              className={ styles.inputForm }
              value={ music }
              onChange={ this.handleChange }
              id="pesquisa"
              type="text"
              data-testid="search-artist-input"
            />
          </label>
          <button
            className={ styles.btnForm }
            onClick={ this.handleClick }
            disabled={ controlBtn }
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar

          </button>
        </form>
        <section>
          {albun.length > 0
           && <h2 className={ styles.result }>{`$${result}${artistName}`}</h2>}
          {albun && albumList}
        </section>
      </div>
    );
  }
}
