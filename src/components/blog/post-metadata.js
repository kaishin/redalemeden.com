import React from 'react';

class PostMetadata extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    const { frontmatter } = this.state.post;

    return (
      <div className="post-metadata">
        <time date={frontmatter.date}>{frontmatter.formattedDate}</time> &mdash;{' '}
        {frontmatter.tags.map((tag) => '#' + tag).join(' ')} &mdash;{' '}
        <span className="reading-time">{this.state.post.timeToRead}min read</span>
      </div>
    );
  }
}

export default PostMetadata;
