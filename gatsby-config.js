module.exports = {
  siteMetadata: {
    description: 'Personal website of Reda Lemeden, programmer, designer, and tech writer based in Stockholm.',
    title: 'Reda Lemeden',
    author: 'Reda Lemeden',
    email: 'hello@redalemeden.com',
    keywords: ['Reda', 'Lemeden', 'Kaishin', 'Designer', 'Programmer', 'Swift', 'Stockholm', 'KaishinLab'],
    siteUrl: 'https://redalemeden.com',
    authorBio: 'Designer, programmer, and illustrator based in Stockholm, Sweden.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sharp',
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-postcss',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
              ignoreFileExtensions: [],
            },
          },
          {
            resolve: 'gatsby-remark-twitter-cards',
            options: {
              author: 'Mestapha',
            },
          },
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          'gatsby-remark-abbr',
          'gatsby-remark-embedder',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: '# ',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
              aliases: {
                sh: 'bash',
              },
              prompt: {
                user: 'user',
                host: 'hostname',
                global: true,
              },
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts/`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/microblog/`,
        name: 'microblog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/data`,
        name: 'data',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://redalemeden.com',
      },
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        trackingUrl: 'stats.redalemeden.com',
        siteId: 'VKAGX',
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: false,
      },
    },
  ],
};
