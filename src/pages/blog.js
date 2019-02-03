import React from 'react';
import { Link, graphql } from 'gatsby';
import Seo from '../components/seo';
import Helmet from 'react-helmet';
import DefaultLayout from '../components/layouts/default.js';

class BlogPage extends React.Component {
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;

    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'blog-page' }} />

        <Seo title="Blog" />
        <article className="content blog-content">
          <h2 class="page-heading">Unredacted</h2>
          <p className="blog-intro">
            My personal blog. I write about design, technology, programming, and other esoteric interests. Subscribe to
            the <Link to="/feed.xml">RSS</Link> or <Link to="/feed.json">JSON</Link> feeds.
          </p>
          <ol class="post-list">
            {posts.map(({ node: post }) => {
              const title = post.frontmatter.title || post.fields.slug;
              return (
                <li class="post-list-item">
                  <article className="post-summary">
                    <span className="post-category">{post.frontmatter.category}</span>
                    <h3 className="post-title">
                      <Link className="post-link" to={post.fields.slug}>
                        {title}
                      </Link>
                    </h3>
                    <div className="post-metadata">
                      <time date={post.frontmatter.date}>{post.frontmatter.formattedDate}</time> &mdash;{' '}
                      <span className="reading-time">{post.timeToRead}min read</span> &mdash;{' '}
                      {post.frontmatter.tags.join(' / ')}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </article>
      </DefaultLayout>
    );
  }
}

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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

export default BlogPage;
