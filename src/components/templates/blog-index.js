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
    const { currentPage, blogPageCount } = this.props.pageContext;
    const isFirst = currentPage === 1
    const isLast = currentPage === blogPageCount
    const newerPage = currentPage - 1 === 1 ? '/blog' : `/blog/${(currentPage - 1).toString()}`
    const olderPage = `/blog/${currentPage + 1}`

    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'blog-page' }} />

        <Seo
          title="Unredacted"
          description="I write about design, technology, programming, and other personal interests."
          keywords={['Unredacted', 'Blog']}
        />
        <article className="content blog-content">
          <BlogHeader />
          <ol className="post-list">
            {posts.map(({ node: post }) => {
              return (
                <li className="post-list-item" key={post.fields.slug}>
                  <article className="post-summary">
                    <span className="post-category">{post.frontmatter.category}</span>
                    <h3 className="post-title">
                      <Link className="post-link" to={post.fields.slug}>
                        {post.frontmatter.title}
                      </Link>
                    </h3>
                    <PostMetadata post={post} />
                  </article>
                </li>
              );
            })}
          </ol>

          <div className="pagination-links">
            {!isFirst &&
              <Link to={newerPage} rel="next">
                &#10094; Newer
              </Link>
            }
            {!isLast &&
              <Link to={olderPage} rel="prev">
                Older &#10095;
              </Link>
            }
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
