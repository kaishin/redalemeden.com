const path = require('path')
const moment = require('moment')
const { createFilePath } = require('gatsby-source-filesystem')
const fs = require('fs-extra')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const blogPostTemplate = path.resolve('./src/templates/template-blog-post.js');

  return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
    }`).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      result.data.allMarkdownRemark.edges
        .forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: node.fields.slug
            }
          });
        });
    });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const isPost = /content\/posts/.test(node.id)
    const value = createFilePath({ node, getNode }).replace(/[0-9]{4}-[0-9]{2}-[0-9]{2}-|\//g, '')

    createNodeField({
      name: `slug`,
      node,
      value: isPost ? `/blog/${moment(node.frontmatter.date).format('YYYY')}/${value}` : value,
    })
  } else if (node.internal.mediaType === `image/gif`) {
    const newPath = path.join(
      process.cwd(),
      'public',
      'gifs',
      node.base
    );
    fs.copy(node.absolutePath, newPath, err => {
      if (err) {
        console.error('Error copying file', err);
      }
    })
  }
}
exports.onCreatePage = async ({ page, boundActionCreators }) => {
  const { createPage, deletePage } = boundActionCreators

  return new Promise((resolve, reject) => {
    if (page.path.match(/syndicate|itunes|nope|pip-my-safari/)) {
      page.layout = "standalone";
    }

    const newPage = Object.assign({}, page, {
      path: page.path === `/` ? page.path : page.path.replace(/\/$/, ``),
    })

    if (newPage.path !== page.path) {
      deletePage(page)
      createPage(newPage)
    }

    resolve();
  });
};
