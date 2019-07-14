import React from 'react';

class Footer extends React.Component {
  render() {
    const { author } = this.props;

    return (
      <footer className="site-footer">
        <ul className="link-list">
          <li className="link">
            <a href="https://widegamut.club/@kaishin" rel="me">
              Mastodon
            </a>
            <span className="separator">/</span>
          </li>
          <li className="link">
            <a href="https://github.com/kaishin" rel="me">
              Github
            </a>
            <span className="separator">/</span>
          </li>
          <li className="link">
            <a href="https://twitter.com/kaishin" rel="me">
              Twitter
            </a>
          </li>
        </ul>
        <span className="copyright">
          <em>&copy;</em> 2009-{new Date().getFullYear()} {author}.
          <br />All Rights Reserved. <a href="https://github.com/kaishin/redalemeden.com">Source</a>
        </span>
      </footer>
    );
  }
}

export default Footer;
