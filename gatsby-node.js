const path = require('path');
const url = require('url');
const { format, parseISO } = require('date-fns');
const { createFilePath } = require('gatsby-source-filesystem');
const fs = require('fs-extra');
const { Feed } = require('feed');
const { feedOptions, runQuery, writeFile, getFileUpdatedDate } = require('./src/utils/feed-helpers');
const publicPath = './public';
const Redirects = require('./redirects.js');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions;
  const blogPostTemplate = path.resolve('./src/components/templates/blog-post.js');
  const blogIndexTemplate = path.resolve('./src/components/templates/blog-index.js');
  const microblogIndexTemplate = path.resolve('./src/components/templates/microblog-index.js');
  const microblogPostTemplate = path.resolve('./src/components/templates/microblog-post.js');

  Redirects.permanent.forEach((redirect) => {
    console.log('Creating redirect for ' + redirect.from);
    createRedirect({
      fromPath: redirect.from,
      toPath: redirect.to,
      isPermanent: true,
    });
  });

  const result = await graphql(`{
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
    }`);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const allPosts = result.data.allMarkdownRemark.edges.filter(({ node }) => {
    return !/content\/microblog/.test(node.fileAbsolutePath);
  });

  const allMicroPosts = result.data.allMarkdownRemark.edges.filter(({ node }) => {
    return /content\/microblog/.test(node.fileAbsolutePath);
  });

  const postsPerPage = 10
  const blogPageCount = Math.ceil(allPosts.length / postsPerPage)

  Array.from({ length: blogPageCount }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogIndexTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        blogPageCount,
        currentPage: i + 1,
      },
    })
  })

  const microPostsPerPage = 20
  const microBlogPageCount = Math.ceil(allMicroPosts.length / microPostsPerPage)

  Array.from({ length: microBlogPageCount }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/microblog` : `/microblog/${i + 1}`,
      component: microblogIndexTemplate,
      context: {
        limit: microPostsPerPage,
        skip: i * microPostsPerPage,
        microBlogPageCount,
        currentPage: i + 1,
      },
    })
  })

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: /content\/microblog/.test(node.fileAbsolutePath) ? microblogPostTemplate : blogPostTemplate,
      context: {
        slug: node.fields.slug,
      },
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
      customPath = `/blog/${format(parseISO(node.frontmatter.date), 'y')}/${value}`;
    } else if (isMicropost) {
      customPath = `/microblog/${value}`;
    }

    createNodeField({
      node,
      name: 'slug',
      value: customPath,
    });

    if (isPost) {
      createNodeField({
        node,
        name: 'dateUpdated',
        value: getFileUpdatedDate(node.fileAbsolutePath),
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

    let body = frontmatter.audience
      ? '<p><em><strong>Assumed audience</strong>: ' +
        frontmatter.audience +
        '. <a href="https://redalemeden.com/microblog/post-1570576215962">What\'s this?</a></em></p>' +
        html
      : html;

    return {
      id: url.resolve(siteUrl, slug),
      url: url.resolve(siteUrl, slug),
      title: frontmatter.title,
      slug: slug,
      datePublished: parseISO(frontmatter.date),
      dateUpdated: parseISO(fields.dateUpdated),
      content: body,
    };
  });

  console.log('Generating JSON and RSS feeds...');

  let newFeed = new Feed({
    title: 'Reda Lemeden – Unredacted',
    description: "Reda Lemeden's main blog",
    link: siteUrl,
    id: 'unredacted',
    copyright: 'All Rights reserved 2013-2020, Reda Lemeden',
    favicon: url.resolve(siteUrl, 'favicon.ico'),
    image: url.resolve(siteUrl, 'icon-touch.png'),
    feedLinks: {
      rss: url.resolve(siteUrl, 'feed.xml'),
      json: url.resolve(siteUrl, 'feed.json'),
    },
    author: {
      name: author,
      email: email,
    },
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
          link: siteUrl,
        },
      ],
    });
  });

  newFeed.addContributor({
    name: author,
    email: email,
    link: siteUrl,
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
      title: frontmatter.title || '',
      ...(frontmatter.excerpt && { excerpt: frontmatter.excerpt }),
      slug: slug,
      tags: frontmatter.tags,
      datePublished: parseISO(frontmatter.date),
      dateUpdated: parseISO(frontmatter.date),
      ...(imageMatch && { image: imageMatch[1] }),
      content: html,
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
      json: url.resolve(siteUrl, 'microblog.json'),
    },
    author: {
      name: author,
      email: email,
    },
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
      extensions: [
        { name: 'tags', objects: item.tags || [] },
        { name: 'excerpt', objects: item.excerpt || item.title },
      ],
      author: [
        {
          name: author,
          email: email,
          link: siteUrl,
        },
      ],
    });
  });

  microBlogFeed.addContributor({
    name: author,
    email: email,
    link: siteUrl,
  });

  await writeFile(path.join(publicPath, 'microblog.json'), microBlogFeed.json1(), 'utf8').catch((r) => {
    console.log('Failed to write JSON Feed file: ', r);
  });

  await writeFile(path.join(publicPath, 'microblog.xml'), microBlogFeed.rss2(), 'utf8').catch((r) => {
    console.log('Failed to write RSS Feed File:', r);
  });

  return Promise.resolve();
};
