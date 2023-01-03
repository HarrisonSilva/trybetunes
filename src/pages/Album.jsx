import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const musicsArray = await getMusics(id);
    this.setState({
      musics: musicsArray,
    });
    console.log(musicsArray);
  }

  render() {
    const { musics } = this.state;
    const artist = musics[0];
    const myMusics = musics.slice(1);
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h3 data-testid="artist-name">
            {musics.length > 0 && artist.artistName}
          </h3>
          <h3 data-testid="album-name">
            {musics.length > 0 && artist.collectionName}
          </h3>
          <div>
            {myMusics.map((music, index) => (
              <MusicCard key={ index } { ...music } />
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
