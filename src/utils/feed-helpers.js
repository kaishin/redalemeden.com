const fs = require('fs');
const pify = require('pify');

const writeFile = pify(fs.writeFile);

const getFileUpdatedDate = (path) => {
  const stats = fs.statSync(path);
  return stats.mtime;
};

const runQuery = (handler, query) =>
  handler(query).then((r) => {
    if (r.errors) {
      throw new Error(r.errors.join(`, `));
    }

    return r.data;
  });

const feedOptions = {
  siteQuery: `
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
    }
  `,

  feedQuery: `
      {
        allMarkdownRemark(
          filter: { frontmatter: { draft: { ne: true } }, fileAbsolutePath: { regex: "/content/posts/" } },
          sort: {order: DESC, fields: [frontmatter___date]}, 
          limit: 10
          ) {
          edges {
            node {
              html
              fields {
                slug
                dateUpdated
              }
              frontmatter {
                date
                title
              }
            }
          }
        }
      }
    `,
  microblogFeedQuery: `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/content/microblog/" },
                    frontmatter: { date: { gt: "2019-07-20T00:00+02:00" }}},
          sort: {order: DESC, fields: [frontmatter___date]}, 
          limit: 100
          ) {
          edges {
            node {
              html
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
          }
        }
      }
  `
};

module.exports = {
  writeFile,
  runQuery,
  feedOptions,
  getFileUpdatedDate
};
