const path = require('path');
const url = require('url');
const moment = require('moment');
const { createFilePath } = require('gatsby-source-filesystem');
const { paginate } = require('gatsby-awesome-pagination');
const fs = require('fs-extra');
const { Feed } = require('feed');
const { feedOptions, runQuery, writeFile, getFileUpdatedDate } = require('./src/utils/feed-helpers');
const publicPath = './public';

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;
  const blogPostTemplate = path.resolve('./src/templates/blog-post.js');
  const blogIndexTemplate = path.resolve('./src/templates/blog-index.js');
  const microblogPostTemplate = path.resolve('./src/templates/microblog-post.js');

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
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          fileAbsolutePath
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

    const allPosts = result.data.allMarkdownRemark.edges.filter(({ node }) => {
      return !/content\/microblog/.test(node.fileAbsolutePath);
    });
    const allMicroPosts = result.data.allMarkdownRemark.edges.filter(({ node }) => {
      return /content\/microblog/.test(node.fileAbsolutePath);
    });

    paginate({
      createPage,
      items: allPosts,
      component: blogIndexTemplate,
      itemsPerPage: 10,
      pathPrefix: '/blog'
    });

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: /content\/microblog/.test(node.fileAbsolutePath) ? microblogPostTemplate : blogPostTemplate,
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
    const isMicropost = /content\/microblog/.test(node.fileAbsolutePath);
    const value = createFilePath({ node, getNode }).replace(/[0-9]{4}-[0-9]{2}-[0-9]{2}-|\//g, '');

    var customPath = value;

    if (isPost) {
      customPath = `/blog/${moment(node.frontmatter.date).format('YYYY')}/${value}`;
    } else if (isMicropost) {
      customPath = `/microblog/${value}`;
    }

    createNodeField({
      node,
      name: 'slug',
      value: customPath
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
  const { site: { siteMetadata: { title, description, siteUrl, author, email } } } = siteQuery;
  const imageRegex = /<img.*?src="(.*?)"/gi;

  // Main Feed

  const feedQuery = await runQuery(graphql, feedOptions.feedQuery);
  const { allMarkdownRemark: { edges: data } } = feedQuery;

  const items = data.map((i) => {
    const { node: { html, frontmatter, fields } } = i;

    let slug = fields.slug;

    return {
      id: url.resolve(siteUrl, slug),
      url: url.resolve(siteUrl, slug),
      title: frontmatter.title,
      slug: slug,
      datePublished: moment(frontmatter.date).toDate(),
      dateUpdated: moment(fields.dateUpdated).toDate(),
      content: html
    };
  });

  console.log('Generating JSON and RSS feeds...');

  let newFeed = new Feed({
    title: 'Reda Lemeden – Unredacted',
    description: "Reda Lemeden's main blog",
    link: siteUrl,
    id: 'unredacted',
    copyright: 'All Rights reserved 2013-2019, Reda Lemeden',
    favicon: url.resolve(siteUrl, 'favicon.ico'),
    image: url.resolve(siteUrl, 'icon-touch.png'),
    feedLinks: {
      rss: url.resolve(siteUrl, 'feed.xml'),
      json: url.resolve(siteUrl, 'feed.json')
    },
    author: {
      name: author,
      email: email
    }
  });

  items.forEach((item) => {
    newFeed.addItem({
      title: item.title,
      id: url.resolve(siteUrl, item.slug),
      link: url.resolve(siteUrl, item.slug),
      date: item.datePublished,
      published: item.datePublished,
      content: item.content,
      author: [
        {
          name: author,
          email: email,
          link: siteUrl
        }
      ]
    });
  });

  newFeed.addContributor({
    name: author,
    email: email,
    link: siteUrl
  });

  await writeFile(path.join(publicPath, 'feed.json'), newFeed.json1(), 'utf8').catch((r) => {
    console.log('Failed to write JSON Feed file: ', r);
  });

  await writeFile(path.join(publicPath, 'feed.xml'), newFeed.rss2(), 'utf8').catch((r) => {
    console.log('Failed to write RSS Feed File:', r);
  });

  // Microblog

  const microblogQuery = await runQuery(graphql, feedOptions.microblogFeedQuery);
  const { allMarkdownRemark: { edges: microposts } } = microblogQuery;

  const micropostItems = microposts.map((i) => {
    const { node: { html, frontmatter, fields } } = i;

    let slug = fields.slug;
    let imageMatch = imageRegex.exec(html);

    return {
      id: url.resolve(siteUrl, slug),
      url: url.resolve(siteUrl, slug),
      title: frontmatter.title || frontmatter.excerpt || '',
      slug: slug,
      tags: frontmatter.tags,
      datePublished: moment(frontmatter.date).toDate(),
      dateUpdated: moment(frontmatter.date).toDate(),
      ...(imageMatch && { image: imageMatch[1] }),
      content: html
    };
  });

  let microBlogFeed = new Feed({
    title: 'Reda Lemeden – Wide Gamut',
    description: "Reda Lemeden's homebrewed micro-blog",
    link: url.resolve(siteUrl, 'microblog'),
    id: 'widegamut',
    copyright: 'All Rights reserved 2013-2019, Reda Lemeden',
    favicon: url.resolve(siteUrl, 'favicon.ico'),
    image: url.resolve(siteUrl, 'icon-touch.png'),
    feedLinks: {
      rss: url.resolve(siteUrl, 'microblog.xml'),
      json: url.resolve(siteUrl, 'microblog.json')
    },
    author: {
      name: author,
      email: email
    }
  });

  micropostItems.forEach((item) => {
    microBlogFeed.addItem({
      title: item.title,
      id: url.resolve(siteUrl, item.slug),
      link: url.resolve(siteUrl, item.slug),
      date: item.datePublished,
      published: item.datePublished,
      content: item.content,
      ...(item.image && { image: url.resolve(siteUrl, item.image) }),
      extensions: [ { name: 'tags', objects: item.tags } ],
      author: [
        {
          name: author,
          email: email,
          link: siteUrl
        }
      ]
    });
  });

  microBlogFeed.addContributor({
    name: author,
    email: email,
    link: siteUrl
  });

  await writeFile(path.join(publicPath, 'microblog.json'), microBlogFeed.json1(), 'utf8').catch((r) => {
    console.log('Failed to write JSON Feed file: ', r);
  });

  await writeFile(path.join(publicPath, 'microblog.xml'), microBlogFeed.rss2(), 'utf8').catch((r) => {
    console.log('Failed to write RSS Feed File:', r);
  });

  return Promise.resolve();
};
