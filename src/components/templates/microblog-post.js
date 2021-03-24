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
    } else {
      title = 'Wide Gamut';
    }

    description = post.excerpt;

    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'microblog-page' }} />

        <Seo title={title} description={description} keywords={post.frontmatter.tags ? post.frontmatter.tags : []} />
        <section className="content blog-content">
          <MicroblogHeader />
          <Micropost post={post} />
          <a
            className="edit-post"
            href={'https://github.com/kaishin/redalemeden.com/edit/main/content' + post.fields.slug + '.md'}
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
