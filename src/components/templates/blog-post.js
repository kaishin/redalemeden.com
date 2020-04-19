import React from 'react';
import Helmet from 'react-helmet';
import Seo from '../seo';
import DefaultLayout from '../layouts/default';
import BlogHeader from '../blog/header';
import PostMetadata from '../blog/post-metadata';
import { Link, graphql } from 'gatsby';

class BlogPostTemplate extends React.Component {
  render() {
    const { markdownRemark: post } = this.props.data;
    var description;
    var image;

    if (post.frontmatter.audience) {
      description = 'Audience: ' + post.frontmatter.audience + '.';
    } else {
      description = post.excerpt;
    }

    if (post.frontmatter.image) {
      image = 'social-cards/' + post.frontmatter.image;
    } else {
      image = (post.fields.slug + '/social-card.jpg').substr(1);
    }

    return (
      <DefaultLayout>
        <Seo
          title={post.frontmatter.title + ' | Unredacted'}
          description={description}
          keywords={post.frontmatter.tags}
          image={image}
          largeImage={true}
        />
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
              <p className="assumed-audience">
                This post was written for {post.frontmatter.audience}.{' '}
                <small>
                  <a href="/microblog/post-1570576215962">What's this?</a>
                </small>
              </p>
            )}
            <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="feedback-box">
              Have feedback about this article? Drop me a line via {' '}
              <a href="https://mastodon.social/@redalemeden">Mastodon</a>,{' '}
              <a href="https://twitter.com/kaishin">Twitter</a>, or the{' '}
              <Link to={'/contact?source=' + post.frontmatter.title}>contact form.</Link>
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
      excerpt
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
        image
        formattedDate: date(formatString: "MMM D, YYYY")
      }
    }
  }
`;
