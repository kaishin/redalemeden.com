import React from 'react';
import Helmet from 'react-helmet';
import Seo from '../components/seo';
import DefaultLayout from '../components/layouts/default';
import BlogHeader from '../components/blog-header';
import { Link, graphql } from 'gatsby';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;

    return (
      <DefaultLayout>
        <Seo title={post.frontmatter.title} />
        <Helmet bodyAttributes={{ class: 'post-page blog-page' }} />

        <article className="content blog-content">
          <BlogHeader />
          <header className="post-header">
            <span className="post-category">{post.frontmatter.category}</span>
            <h1 className="post-title">
              <Link className="post-link" to={post.fields.slug}>
                {post.frontmatter.title}
              </Link>
            </h1>
            <div className="post-metadata">
              <time date={post.frontmatter.date}>{post.frontmatter.formattedDate}</time> &mdash;{' '}
              <span className="reading-time">{post.timeToRead}min read</span> &mdash;{' '}
              {post.frontmatter.tags.join(' / ')}
            </div>
          </header>

          <section className="full-post-content">
            <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: post.html }} />

            <div className="feedback-box">
              Have feedback about this article? Drop me a line via {' '}
              <a href="https://widegamut.club/@kaishin">Mastodon</a> or through the{' '}
              <Link to="/contact?hello">contact form.</Link>
            </div>
          </section>
        </article>
      </DefaultLayout>
    );
  }
}

export default BlogPostTemplate;

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
        tags
        formattedDate: date(formatString: "MMM D, YYYY")
      }
    }
  }
`;
