import React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/seo'
import Helmet from 'react-helmet'
import DefaultLayout from '../components/layouts/default.js'

class BlogPage extends React.Component {
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark

    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'blog-page' }} />

        <Seo title="Blog" />
        <article className="content blog-content">
          <h3 class="page-heading">Blog</h3>
          <ol class="post-list">
            {posts.map(({ node: post }) => {
              const title = post.frontmatter.title || post.fields.slug
              return (
                <li class="post-list-item">
                  <article className="post-summary">
                    <h2 className="post-title">
                      <Link className="post-link" to={post.fields.slug}>
                        {title}
                      </Link>
                    </h2>
                    <div className="post-metadata">
                      <span className="category">{post.frontmatter.category}</span>
                      <span className="separator"> | </span>
                      <time date={post.frontmatter.date}>
                        {post.frontmatter.formattedDate}
                      </time>
                      <span className="separator"> | </span>
                      <span className="reading-time">{post.timeToRead}min read</span>
                    </div>
                  </article>
                </li>
              )
            })}
          </ol>
        </article>
      </DefaultLayout>
    )
  }
}

export const pageQuery = graphql`
query BlogIndexQuery {
  allMarkdownRemark(
    sort: { 
      order: DESC, 
      fields: [frontmatter___date] 
    }) {
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
          formattedDate: date(formatString: "MMMM DD, YYYY")
          category
        }
      }
    }
  }
}
`

export default BlogPage
