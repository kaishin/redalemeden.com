import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Seo from '../seo';
import DefaultLayout from '../layouts/default.js';
import BlogHeader from '../blog/header';
import PostMetadata from '../blog/post-metadata';

class BlogIndexPage extends React.Component {
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;
    const { pageContext } = this.props;
    const { previousPagePath, nextPagePath } = pageContext;

    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'blog-page' }} />

        <Seo title="Blog" />
        <article className="content blog-content">
          <BlogHeader />
          <ol className="post-list">
            {posts.map(({ node: post }) => {
              const title = post.frontmatter.title || post.fields.slug;
              return (
                <li className="post-list-item" key={post.fields.slug}>
                  <article className="post-summary">
                    <span className="post-category">{post.frontmatter.category}</span>
                    <h3 className="post-title">
                      <Link className="post-link" to={post.fields.slug}>
                        {title}
                      </Link>
                    </h3>
                    <PostMetadata post={post} />
                  </article>
                </li>
              );
            })}
          </ol>

          <div className="pagination-links">
            {previousPagePath ? <Link to={previousPagePath}>&lsaquo; Newer</Link> : null}
            {nextPagePath ? <Link to={nextPagePath}>Older &rsaquo;</Link> : null}
          </div>
        </article>
      </DefaultLayout>
    );
  }
}

export const pageQuery = graphql`
  query BlogIndexQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } }, fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          timeToRead
          fields {
            slug
          }
          frontmatter {
            title
            date
            formattedDate: date(formatString: "MMM DD, YYYY")
            category
            tags
          }
        }
      }
    }
  }
`;

export default BlogIndexPage;
