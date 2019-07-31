import React from 'react';
import Seo from '../components/seo';
import { graphql } from 'gatsby';
import moment from 'moment';
import map from 'lodash/map';
import Helmet from 'react-helmet';
import DefaultLayout from '../components/layouts/default.js';
import MicroblogHeader from '../components/microblog/header';
import Micropost from '../components/microblog/micropost';

class MicroBlogPage extends React.Component {
  componentDidMount() {
    var timeStamps = document.getElementsByTagName('time');

    map(timeStamps, function(elem) {
      var relativeTime = moment(elem.getAttribute('date')).fromNow();
      elem.innerHTML = relativeTime;
    });
  }

  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;

    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'microblog-page' }} />

        <Seo title="Blog" />
        <section className="content blog-content">
          <MicroblogHeader />
          <ol className="post-list">
            {posts.map(({ node: post }) => {
              return (
                <li className="post-list-item" key={post.fields.slug}>
                  <Micropost post={post} />
                </li>
              );
            })}
          </ol>
        </section>
      </DefaultLayout>
    );
  }
}

export const microblogQuery = graphql`
  query MicroblogIndexQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/microblog/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          ...MicroBlogPost
        }
      }
    }
  }
`;

export const microBlogFragment = graphql`
  fragment MicroBlogPost on MarkdownRemark {
    html
    rawMarkdownBody
    frontmatter {
      date
      formattedDate: date(formatString: "HH:mm MMM DD, YYYY")
      title
      excerpt
      tags
    }
    fields {
      slug
    }
  }
`;

export default MicroBlogPage;
