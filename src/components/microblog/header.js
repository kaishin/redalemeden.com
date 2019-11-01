import React from 'react';
import { Link } from 'gatsby';

class MicroblogHeader extends React.Component {
  render() {
    return (
      <aside className="blog-header">
        <h2 className="page-heading">Wide Gamut</h2>
        <p className="blog-intro">
          A collection of micro posts, hot takes, and reflections about whatever happens to preoccupy me. Stay updated
          using <Link to="/microblog.xml">RSS</Link>/<Link to="/microblog.json">JSON</Link> feeds,{' '}
          <a href="https://twitter.com/kaishin">Twitter</a>, or <a href="https://widegamut.club/kaishin">Mastodon</a>.
        </p>
      </aside>
    );
  }
}

export default MicroblogHeader;
