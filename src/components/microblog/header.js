import React from 'react';
import { Link } from 'gatsby';
import PageHeader from '../page-header';

class MicroblogHeader extends React.Component {
  render() {
    return (
      <PageHeader title="Wide Gamut">
        A collection of micro posts, hot takes, and reflections about whatever happens to preoccupy me. Stay updated
        using <Link to="/microblog.xml">RSS</Link>/<Link to="/microblog.json">JSON</Link> feeds,{' '}
        <a href="https://twitter.com/kaishin">Twitter</a>, or{' '}
        <a href="https://mastodon.social/@redalemeden">Mastodon</a>
      </PageHeader>
    );
  }
}

export default MicroblogHeader;
