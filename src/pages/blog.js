import React from 'react';
import { Link, graphql } from 'gatsby';
import Seo from '../components/seo';
import Helmet from 'react-helmet';
import DefaultLayout from '../components/layouts/default.js';
import BlogHeader from '../components/blog/blog-header';
import PostMetadata from '../components/blog/post-metadata';

class BlogPage extends React.Component {
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;

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
