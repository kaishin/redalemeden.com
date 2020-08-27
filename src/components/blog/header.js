import React from 'react';
import PageHeader from '../page-header';

class BlogHeader extends React.Component {
  render() {
    return (
      <PageHeader title="Unredacted">
        I write about design, technology, programming, and other personal interests. Subscribe to the{' '}
        <a href="/feed.xml">RSS</a> or <a href="/feed.json">JSON</a> feeds to get the latest articles.
      </PageHeader>
    );
  }
}

export default BlogHeader;
