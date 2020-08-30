module.exports = {
  siteMetadata: {
    description: 'Personal website of Reda Lemeden.',
    title: 'Reda Lemeden',
    author: 'Reda Lemeden',
    email: 'hello@redalemeden.com',
    keywords: ['Reda', 'Lemeden', 'Kaishin', 'Designer', 'Programmer', 'Swift', 'Stockholm', 'KaishinLab'],
    siteUrl: 'https://redalemeden.com',
    authorBio: 'Independent Developer, Designer, and Writer Based in Stockholm, Sweden.',
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
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              showCaptions: true,
              tracedSVG: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
              ignoreFileExtensions: [],
            },
          },
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          'gatsby-remark-embedder',
          'gatsby-remark-autolink-headers',
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
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cms',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
              modulePath: `${__dirname}/src/cms/index.js`,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
              ignoreFileExtensions: [],
            },
          },
          {
            resolve: 'gatsby-remark-social-cards',
            options: {
              subtitleFontSize: 50,
              fontStyle: 'sans-serif',
              background: require.resolve('./assets/social-card-background.jpg'),
              fontFile: require.resolve('./assets/rubik-bold.ttf'),
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
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: false,
      },
    },
  ],
};
