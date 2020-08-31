import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Seo from '../seo';
import moment from 'moment';
import map from 'lodash/map';
import DefaultLayout from '../layouts/default.js';
import MicroblogHeader from '../microblog/header';
import Micropost from '../microblog/micropost';

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
    const { pageContext } = this.props;
    const { previousPagePath, nextPagePath } = pageContext;

    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'microblog-page' }} />

        <Seo
          title="Wide Gamut"
          description="A collection of micro posts, hot takes, and reflections about whatever happens to preoccupy me."
          keywords={['Microblog', 'Wide Gamut']}
        />
        <article className="content blog-content">
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

          <div className="pagination-links">
            {previousPagePath ? <Link to={previousPagePath}>&lsaquo; Newer</Link> : null}
            {nextPagePath ? <Link to={nextPagePath}>Older &rsaquo;</Link> : null}
          </div>
        </article>
      </DefaultLayout>
    );
  }
}

export const microblogQuery = graphql`
  query MicroblogIndexQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } }, fileAbsolutePath: { regex: "/content/microblog/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
      skip: $skip
      limit: $limit
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
    excerpt
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
