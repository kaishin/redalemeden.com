const path = require('path')
const moment = require('moment')
const { createFilePath } = require('gatsby-source-filesystem')
const fs = require('fs-extra')

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions
  const blogPostTemplate = path.resolve('./src/templates/blog-post.js');

  createRedirect({ fromPath: "/blog/2011/skeuomorphism-in-ui-design", toPath: "/blog/2011/on-skeuomorphism", isPermanent: true })
  createRedirect({ fromPath: "/blog/2011/thoughts-on-scrollbars-in-lion", toPath: "/blog/2011/scrollbars-in-osx-lion", isPermanent: true })
  createRedirect({ fromPath: "/blog/2011/invisible-interfaces", toPath: "/blog/2011/invisible-computers", isPermanent: true })
  createRedirect({ fromPath: "/blog/2011/2011-ui-design", toPath: "/blog/2011/year-in-interface-design", isPermanent: true })

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
        console.log(result.errors)
        reject(result.errors)
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const isPost = /content\/posts/.test(node.fileAbsolutePath)
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
