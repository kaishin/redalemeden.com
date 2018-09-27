import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Seo from '../components/seo'
import get from 'lodash/get'
import { Link, graphql } from 'gatsby'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <React.Fragment>
        <Seo title={post.frontmatter.title} />
        <Helmet bodyAttributes={{class: "post-page blog-page"}}>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sintony:400,700|Titillium+Web:600,700"/>
        </Helmet>
           
        <article className="content blog-content">
          <header className="post-header">
            <div className="post-category">{post.frontmatter.category}</div>
            <h1 className="post-title">
              <Link className="post-link" to={post.fields.slug}>
                {post.frontmatter.title}
              </Link>
            </h1>
          </header>

          <aside className="post-metadata">
            <time date={post.frontmatter.date}>
              {post.frontmatter.formattedDate}
            </time>
            <span className="separator"> &mdash; </span>
            <span className="reading-time">{post.timeToRead}min read</span>
          </aside>

          <section className="full-post-content">
            <div dangerouslySetInnerHTML={{ __html: post.html }} />

            <div className="feedback-box">
              <a href={'https://twitter.com/intent/tweet?url=' + post.fields.slug + '=&amp;text=' + encodeURIComponent(post.frontmatter.title) + '&amp;via=kaishin'} target="_blank">Tweet this</a> or send your feedback to <a target="_blank" href="https://twitter.com/intent/tweet?screen_name=kaishin">@kaishin</a>.
            </div>
          </section>
        </article>
      </React.Fragment>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        date
        category
        formattedDate: date(formatString: "MMM D, YYYY")
      }
    }
  }
`
