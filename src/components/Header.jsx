import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    nameUser: '',
    loading: true,
  };

  componentDidMount() {
    this.showUserName();
  }

  showUserName = async () => {
    const { name } = await getUser();
    this.setState(
      { loading: false, nameUser: name },
    );
  };

  render() {
    const { loading, nameUser } = this.state;
    if (loading) {
      return <span>Carregando...</span>;
    }
    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">{ nameUser }</h2>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link data-testid="link-to-search" to="/search">Search</Link>
          </li>
          <li>
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          </li>
        </ul>
      </header>
    );
  }
}
