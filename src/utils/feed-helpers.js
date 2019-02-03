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
          sort: {order: DESC, fields: [frontmatter___date]}, 
          limit: 10, 
          
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
      `
};

module.exports = {
  writeFile,
  runQuery,
  feedOptions,
  getFileUpdatedDate
};
