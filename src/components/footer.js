import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

class Footer extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                author
                siteUrl
                email
                authorBio
              }
            }
          }
        `}
        render={(data) => (
          <footer className="site-footer">
            <ul className="link-list">
              {children}
              <li className="link">
                <a href="https://github.com/kaishin" rel="me">
                  GitHub
                </a>
                <span className="separator">/</span>
              </li>
              <li className="link">
                <a href="https://mastodon.social/@redalemeden" rel="me">
                  Mastodon
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
              <a className="p-name u-url" href={data.site.siteMetadata.siteUrl}>
                {data.site.siteMetadata.author}
              </a>
              <img
                className="u-photo"
                src={data.site.siteMetadata.siteUrl + '/author-photo.jpg'}
                alt={data.site.siteMetadata.author}
              />
              <p className="p-note">{data.site.siteMetadata.authorBio}</p>
              <a className="u-email" href={'mailto:' + data.site.siteMetadata.email}>
                {data.site.siteMetadata.email}
              </a>
            </div>
            <span className="copyright">
              <em>&copy;</em> 2009-{new Date().getFullYear()} {data.site.siteMetadata.author}.<br />
              <small>
                <a href="https://github.com/kaishin/redalemeden.com">Source Code</a>
              </small>
            </span>
          </footer>
        )}
      />
    );
  }
}

export default Footer;
