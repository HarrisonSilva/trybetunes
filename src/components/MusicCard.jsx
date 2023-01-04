import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  state = {
    favorite: false,
  };

  componentDidMount() {
    const { isFavoriteMusic } = this.props;
    this.setState({
      favorite: isFavoriteMusic,
    });
  }

  handleClick = ({ target }) => {
    const isFavorite = target.checked;
    this.setState({
      favorite: isFavorite,
    });
  };

  render() {
    const { previewUrl, trackName, trackId, addFavoriteMusic } = this.props;
    const { favorite } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            name={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ addFavoriteMusic }
            onClick={ this.handleClick }
            id="favorite"
            type="checkbox"
            checked={ favorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  addFavoriteMusic: PropTypes.func.isRequired,
  isFavoriteMusic: PropTypes.bool.isRequired,
};
