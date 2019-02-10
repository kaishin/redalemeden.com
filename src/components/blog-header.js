import React from 'react';
import { Link } from 'gatsby';

class BlogHeader extends React.Component {
  render() {
    return (
      <aside className="blog-header">
        <h2 class="page-heading">Unredacted</h2>
        <p className="blog-intro">
          I write about design, technology, programming, and other esoteric interests. Subscribe to the{' '}
          <Link to="/feed.xml">RSS</Link> or <Link to="/feed.json">JSON</Link> feeds to get the latest articles.
        </p>
      </aside>
    );
  }
}

export default BlogHeader;
