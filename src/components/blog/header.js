import React from 'react';

class BlogHeader extends React.Component {
  render() {
    return (
      <aside className="blog-header">
        <h2 className="page-heading">Unredacted</h2>
        <p className="blog-intro">
          I write about design, technology, programming, and other personal interests. Subscribe to the{' '}
          <a href="/feed.xml">RSS</a> or <a href="/feed.json">JSON</a> feeds to get the latest articles.
        </p>
      </aside>
    );
  }
}

export default BlogHeader;
