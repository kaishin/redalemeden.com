import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Seo from '../seo';
import { parseISO, formatDistance } from 'date-fns';
import map from 'lodash/map';
import DefaultLayout from '../layouts/default.js';
import MicroblogHeader from '../microblog/header';
import Micropost from '../microblog/micropost';

class MicroBlogPage extends React.Component {
  componentDidMount() {
    var timeStamps = document.getElementsByTagName('time');

    map(timeStamps, function(elem) {
      var relativeTime = formatDistance(parseISO(elem.getAttribute('date')), new Date());
      elem.innerHTML = relativeTime + ' ago';
    });
  }

  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;
    const { currentPage, microBlogPageCount } = this.props.pageContext;
    const isFirst = currentPage === 1
    const isLast = currentPage === microBlogPageCount
    const newerPage = currentPage - 1 === 1 ? '/microblog' : `/microblog/${(currentPage - 1).toString()}`
    const olderPage = `/microblog/${currentPage + 1}`

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
            {!isFirst &&
              <Link to={newerPage} rel="next">
                &#10094; Newer
              </Link>
            }
            {!isLast &&
              <Link to={olderPage} rel="prev">
                Older &#10095;
              </Link>
            }
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
