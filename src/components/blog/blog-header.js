import React from 'react';

class BlogHeader extends React.Component {
  render() {
    return (
      <aside className="blog-header">
        <h2 class="page-heading">Unredacted</h2>
        <p className="blog-intro">
          I write about design, technology, programming, and other esoteric interests. Subscribe to the{' '}
          <a href="/feed.xml">RSS</a> or <a href="/feed.json">JSON</a> feeds to get the latest articles.
        </p>
      </aside>
    );
  }
}

export default BlogHeader;
