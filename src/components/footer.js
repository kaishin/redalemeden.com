import React from 'react';

class Footer extends React.Component {
  render() {
    const { author, siteUrl, email, authorBio } = this.props;

    return (
      <footer className="site-footer">
        <ul className="link-list">
          <li className="link">
            <a href="https://mastodon.social/@redalemeden" rel="me">
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
        <div className="h-card" style={{ display: 'none' }}>
          <a className="p-name u-url" href={siteUrl}>
            {author}
          </a>
          <img className="u-photo" src={siteUrl + '/author-photo.jpg'} alt={author} />
          <p className="p-note">{authorBio}</p>
          <a className="u-email" href={'mailto:' + email}>
            {email}
          </a>
        </div>
        <span className="copyright">
          <em>&copy;</em> 2009-{new Date().getFullYear()} {author}.<br />
          <small>
            <a href="https://github.com/kaishin/redalemeden.com">Source Code</a>
          </small>
        </span>
      </footer>
    );
  }
}

export default Footer;
