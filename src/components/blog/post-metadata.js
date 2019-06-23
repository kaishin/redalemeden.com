import React from 'react';

class PostMetadata extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const { frontmatter } = this.state.post;

    return (
      <div className="post-metadata">
        <time date={frontmatter.date}>{frontmatter.formattedDate}</time> &mdash;{' '}
        <ul className="tag-list">
          {frontmatter.tags.map((tag) => {
            return (
              <li className="tag" key={tag}>
                {'#' + tag + ' '}
              </li>
            );
          })}
        </ul>&mdash; <span className="reading-time">{this.state.post.timeToRead}min read</span>
      </div>
    );
  }
}

export default PostMetadata;
