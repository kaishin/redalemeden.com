import React from 'react';

class Footer extends React.Component {
  render() {
    const { author } = this.props;

    return (
      <footer className="site-footer">
        <ul className="link-list">
          <li className="link">
            <a href="https://widegamut.club/@kaishin">Mastodon</a>
            <span className="separator">/</span>
          </li>
          <li className="link">
            <a href="https://github.com/kaishin">Github</a>
            <span className="separator">/</span>
          </li>
          <li className="link">
            <a href="https://dribbble.com/kaishin">Dribbble</a>
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
