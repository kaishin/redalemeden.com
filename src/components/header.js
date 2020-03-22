import React from 'react';
import { Link } from 'gatsby';

import { ReactComponent as SakigakeLogo } from '../images/sakigake.svg';

class Header extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <header className="site-header">
        <Link to="/" activeClassName="header-link">
          <h1 className="full-name">{title}</h1>
        </Link>
        <div className="sakigake">
          <SakigakeLogo className="asset" />
        </div>
      </header>
    );
  }
}

export default Header;
