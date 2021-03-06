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
              <p className="addendum-box">
                <a href="/microblog/post-1570576215962"><strong>Assumed audience</strong></a>: {post.frontmatter.audience}.{' '}
              </p>
            )}
            <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="addendum-box">
              Have feedback or questions? Drop me a line via the{' '}
              <Link to={'/contact?source=' + post.frontmatter.title}>contact form</Link>,{' '}
              <a href="https://twitter.com/kaishin">Twitter</a>, or{' '}
              <a href="https://mastodon.social/@redalemeden">Mastodon</a>.<br />
              Found any typos? Edit the post{' '}
              <a
                href={
                  'https://github.com/kaishin/redalemeden.com/edit/main/content/posts/' + post.parent.relativePath
                }
              >
                here
              </a>.
            </div>
          </section>

          <hr className="divider" />

          <div className="shrunk-header">
            <BlogHeader />
          </div>
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
      parent {
        ... on File {
          relativePath
        }
      }
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
