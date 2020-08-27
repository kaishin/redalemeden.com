import React from 'react';
import { Link } from 'gatsby';

import { ReactComponent as SakigakeLogo } from '../images/sakigake.svg';

class Header extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <header className="site-header">
        <Link to="/" className="header-link">
          <div className="avatar-placeholder" />
          <img className="author-avatar" src="author-photo.jpg" alt="Reda Lemeden" />
          <h1 className="author-name">{title}</h1>
          <p className="author-bio">
            Independent <em>Designer</em>, <em>Developer</em>, and <em>Writer</em>
          </p>
        </Link>
        <div className="sakigake">
          <SakigakeLogo className="asset" />
        </div>
      </header>
    );
  }
}

export default Header;
