import React from 'react';
import Helmet from 'react-helmet';
import Seo from '../seo';
import DefaultLayout from '../layouts/default';
import Micropost from '../microblog/micropost';
import MicroblogHeader from '../microblog/header';
import { graphql } from 'gatsby';

class MicroBlogPostTemplate extends React.Component {
  render() {
    const { markdownRemark: post } = this.props.data;
    var description;
    var title;

    if (post.frontmatter.title) {
      title = post.frontmatter.title + ' | Wide Gamut';
      description = post.frontmatter.excerpt ? post.frontmatter.excerpt : post.excerpt;
    } else if (post.frontmatter.excerpt) {
      title = post.frontmatter.excerpt;
      description = post.excerpt;
    } else {
      title = 'Wide Gamut';
      description = 'Posted on ' + post.frontmatter.formattedDate;
    }

    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'microblog-page' }} />

        <Seo title={title} description={description} keywords={post.frontmatter.tags ? post.frontmatter.tags : []} />
        <section className="content blog-content">
          <MicroblogHeader />
          <Micropost post={post} />
          <a
            className="edit-post"
            href={'https://github.com/kaishin/redalemeden.com/edit/master/content' + post.fields.slug + '.md'}
          >
            Edit Entry
          </a>
        </section>
      </DefaultLayout>
    );
  }
}

export default MicroBlogPostTemplate;

export const pageQuery = graphql`
  query MicroPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...MicroBlogPost
    }
  }
`;
