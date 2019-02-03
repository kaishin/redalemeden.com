const path = require('path');
const moment = require('moment');
const { createFilePath } = require('gatsby-source-filesystem');
const fs = require('fs-extra');
const { Feed } = require('feed');
const { feedOptions, runQuery, writeFile, getFileUpdatedDate } = require('./src/utils/feed-helpers');
const publicPath = './public';

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;
  const blogPostTemplate = path.resolve('./src/templates/blog-post.js');

  createRedirect({
    fromPath: '/blog/2011/skeuomorphism-in-ui-design',
    toPath: '/blog/2011/on-skeuomorphism',
    isPermanent: true
  });
  createRedirect({
    fromPath: '/blog/2011/thoughts-on-scrollbars-in-lion',
    toPath: '/blog/2011/scrollbars-in-osx-lion',
    isPermanent: true
  });
  createRedirect({
    fromPath: '/blog/2011/invisible-interfaces',
    toPath: '/blog/2011/invisible-computers',
    isPermanent: true
  });
  createRedirect({
    fromPath: '/blog/2011/2011-ui-design',
    toPath: '/blog/2011/year-in-interface-design',
    isPermanent: true
  });
  createRedirect({
    fromPath: '/blog/2011/twitter-client-showdown',
    toPath: '/blog/2011/twitter-ios-showdown',
    isPermanent: true
  });
  createRedirect({
    fromPath: '/blog/2012/twitter-client-showdown-round-2',
    toPath: '/blog/2012/twitter-ios-showdown-round-2',
    isPermanent: true
  });
  createRedirect({ fromPath: '/blog/2015/writing', toPath: '/blog/2015/back-to-writing', isPermanent: true });

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
    }`).then((result) => {
    if (result.errors) {
      console.log(result.errors);
      reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
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
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const isPost = /content\/posts/.test(node.fileAbsolutePath);
    const value = createFilePath({ node, getNode }).replace(/[0-9]{4}-[0-9]{2}-[0-9]{2}-|\//g, '');

    createNodeField({
      node,
      name: 'slug',
      value: isPost ? `/blog/${moment(node.frontmatter.date).format('YYYY')}/${value}` : value
    });

    if (isPost) {
      createNodeField({
        node,
        name: 'dateUpdated',
        value: getFileUpdatedDate(node.fileAbsolutePath)
      });
    }
  } else if (node.internal.mediaType === `image/gif`) {
    const newPath = path.join(process.cwd(), 'public', 'gifs', node.base);
    fs.copy(node.absolutePath, newPath, (err) => {
      if (err) {
        console.error('Error copying file', err);
      }
    });
  }
};

exports.onPostBuild = async ({ graphql }) => {
  const siteQuery = await runQuery(graphql, feedOptions.siteQuery);
  const { site: { siteMetadata: { title, description, siteUrl, author } } } = siteQuery;
  const feedQuery = await runQuery(graphql, feedOptions.feedQuery);
  const { allMarkdownRemark: { edges: data } } = feedQuery;

  const items = data.map((i) => {
    const { node: { html, frontmatter, fields } } = i;

    let slug = fields.slug;

    return {
      id: path.join(siteUrl, slug),
      url: path.join(siteUrl, slug),
      title: frontmatter.title,
      slug: slug,
      datePublished: moment(frontmatter.date).toDate(),
      dateUpdated: moment(fields.dateUpdated).toDate(),
      content: html
    };
  });

  console.log('Generating JSON and RSS feeds...');

  let newFeed = new Feed({
    title: title,
    description: description,
    link: siteUrl,
    id: siteUrl,
    copyright: 'All Rights reserved 2013-2019, Reda Lemeden',
    favicon: path.join(siteUrl, 'favicon.ico'),
    image: path.join(siteUrl, 'icon-touch.png'),
    feedLinks: {
      rss: path.join(siteUrl, 'feed.xml'),
      json: path.join(siteUrl, 'feed.json')
    },
    author: {
      name: author,
      email: 'hello@redalemeden.com'
    }
  });

  items.forEach((item) => {
    newFeed.addItem({
      title: item.title,
      id: path.join(siteUrl, item.slug),
      link: path.join(siteUrl, item.slug),
      date: item.dateUpdated,
      published: item.datePublished,
      content: item.content,
      author: [
        {
          name: author,
          email: 'hello@redalemeden.com',
          link: siteUrl
        }
      ]
    });
  });

  newFeed.addContributor({
    name: author,
    email: 'hello@redalemeden.com',
    link: siteUrl
  });

  await writeFile(path.join(publicPath, 'feed.json'), newFeed.json1(), 'utf8').catch((r) => {
    console.log('Failed to write JSON Feed file: ', r);
  });

  await writeFile(path.join(publicPath, 'feed.xml'), newFeed.rss2(), 'utf8').catch((r) => {
    console.log('Failed to write RSS Feed File:', r);
  });

  return Promise.resolve();
};
