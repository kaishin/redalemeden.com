import React from 'react';
import { Link } from 'gatsby';

class Navigation extends React.Component {
  render() {
    return (
      <nav className="site-navigation">
        <ol className="navigation-links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/work">Work</Link>
          </li>
          <li className="link">
            <Link to="/blog">
              Blog
              <small>Unredacted</small>
            </Link>
          </li>
          <li className="link">
            <Link to="/microblog">
              Microblog
              <small>Wide Gamut</small>
            </Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ol>
      </nav>
    );
  }
}

export default Navigation;
