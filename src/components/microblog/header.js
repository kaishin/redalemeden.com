import React from 'react';
import PageHeader from '../page-header';

class MicroblogHeader extends React.Component {
  render() {
    return (
      <PageHeader title="Wide Gamut">
        A collection of micro posts, hot takes, and reflections about whatever happens to preoccupy me. Stay updated
        using the <a href="/microblog.xml">RSS</a>/<a href="/microblog.json">JSON</a> feeds,{' '}
        or by following <a href="https://twitter.com/WideGamutFeed">@WideGamutFeed</a> on Twitter.
      </PageHeader>
    );
  }
}

export default MicroblogHeader;
