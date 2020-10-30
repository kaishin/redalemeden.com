import React from 'react';
import PageHeader from '../page-header';

class BlogHeader extends React.Component {
  render() {
    return (
      <PageHeader title="Unredacted">
        A blog about design, technology, programming, and other personal interests. Subscribe to the{' '}
        <a href="/feed.xml">RSS</a> or <a href="/feed.json">JSON</a> feeds to get the latest articles,{' '}
        or follow me on <a href="https://twitter.com/kaishin">Twitter</a> and{' '}
        <a href="https://mastodon.social/@redalemeden">Mastodon</a>.
      </PageHeader>
    );
  }
}

export default BlogHeader;
