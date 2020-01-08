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

    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'microblog-page' }} />

        <Seo title={post.frontmatter.title || 'Microblog Entry ' + post.frontmatter.formattedDate} />
        <section className="content blog-content">
          <MicroblogHeader />
          <Micropost post={post} />
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
