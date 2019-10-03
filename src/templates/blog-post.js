import React from 'react';
import Helmet from 'react-helmet';
import Seo from '../components/seo';
import DefaultLayout from '../components/layouts/default';
import BlogHeader from '../components/blog/header';
import PostMetadata from '../components/blog/post-metadata';
import { Link, graphql } from 'gatsby';

class BlogPostTemplate extends React.Component {
  render() {
    const { markdownRemark: post } = this.props.data;

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
            <PostMetadata post={post} />
          </header>

          <section className="full-post-content">
            {post.frontmatter.audience && (
              <p class="assumed-audience">
                This post was written for {post.frontmatter.audience}.{' '}
                <small>
                  <a href="/microblog/post-1570576215962">What's this?</a>
                </small>
              </p>
            )}
            <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="feedback-box">
              Have feedback about this article? Drop me a line via {' '}
              <a href="https://widegamut.club/@kaishin">Mastodon</a>, <a href="https://twitter.com/kaishin">Twitter</a>,
              or the <Link to={'/contact?source=' + post.frontmatter.title}>contact form.</Link>
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
        audience
        formattedDate: date(formatString: "MMM D, YYYY")
      }
    }
  }
`;
