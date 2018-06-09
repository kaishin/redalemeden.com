import React from 'react'
import Link from 'gatsby-link'
import Seo from '../components/seo'
import Helmet from 'react-helmet'
import Moment from 'moment'

class BlogPage extends React.Component {
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark

    return (
      <React.Fragment>
        <Helmet bodyAttributes={{class: "blog-page"}}>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sintony:400,700|Titillium+Web:600,700"/>
        </Helmet>
        
        <Seo title='Blog' />
        <article className="content blog-content">
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
                    <time date={post.frontmatter.date}>
                      {post.frontmatter.formattedDate}
                    </time>
                    <span className="separator"> &mdash; </span>
                    <span className="reading-time">{post.timeToRead}min read</span>
                  </div>

                  <section className="post-content">
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  </section>
                </article>
              </li>
            )
          })}
          </ol>
        </article>
      </React.Fragment>
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
