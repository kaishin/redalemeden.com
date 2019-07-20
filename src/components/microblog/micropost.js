import React from 'react';
import { Link } from 'gatsby';

class Micropost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const { post } = this.state;

    return (
      <article className="micro-post">
        <div className="post-metadata">
          <Link to={post.fields.slug} className="permalink">
            <time date={post.frontmatter.date}>{post.frontmatter.formattedDate}</time>
          </Link>
        </div>
        {post.frontmatter.title && <h2 className="title">{post.frontmatter.title}</h2>}
        <div className="full-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.frontmatter.tags && (
          <div className="post-metadata">
            <ul className="tag-list">
              {post.frontmatter.tags.map((tag) => {
                return (
                  <li className="tag" key={tag}>
                    {'#' + tag + ' '}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </article>
    );
  }
}

export default Micropost;
