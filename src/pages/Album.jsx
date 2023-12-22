import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import styles from '../styles/album/index.module.css';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      loading: false,
      musicsFavorites: [],
      loadingFavorite: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const musicsArray = await getMusics(id);
    this.setState({
      musics: musicsArray,
    });
    this.loadingFavoritesSongs();
  }

  loadingFavoritesSongs = async () => {
    const musicsFavorites = await getFavoriteSongs();
    this.setState({
      musicsFavorites,
      loadingFavorite: false,
    });
  };

  addFavoriteMusic = async ({ target }) => {
    const { musics } = this.state;
    const myMusics = musics.slice(1);
    const songFavorite = myMusics.find((music) => music.trackId === Number(target.name));
    this.setState({
      loading: true,
    });
    await addSong(songFavorite);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { musics, loading, loadingFavorite, musicsFavorites } = this.state;
    const artist = musics[0];
    const myMusics = musics.slice(1);
    if (loadingFavorite) return (<p>Carregando...</p>);
    return (
      <div data-testid="page-album">
        <Header />
        {loading
        && <p className={ styles.loading }>Carregando...</p> }
        <section>
          <h3 className={ styles.band } data-testid="artist-name">
            {musics.length > 0 && artist.artistName}
          </h3>
          <h3 className={ styles.album } data-testid="album-name">
            {musics.length > 0 && artist.collectionName}
          </h3>
          <div>
            {myMusics.map((music, index) => (
              <MusicCard
                key={ index }
                { ...music }
                isFavoriteMusic={
                  musicsFavorites
                    .some((favorite) => favorite.trackId === music.trackId)
                }
                addFavoriteMusic={ this.addFavoriteMusic }
              />
            ))}
          </div>
        </section>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

};
