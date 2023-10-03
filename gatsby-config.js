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
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              showCaptions: true,
              tracedSVG: true,
              quality: 90
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
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    'gatsby-plugin-gatsby-cloud',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-furigana',
            options: {
              parenthesis: '()',
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
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: '# ',
            },
          },
          {
            resolve: 'gatsby-remark-vscode',
            options: {
              theme: {
                default: 'Noctis Lux',
                dark: 'Abyss',
                parentSelector: {
                  'body.light-theme': 'Noctis Lux',
                  'body.dark-theme': 'Abyss',
                },
              },
              injectStyles: false,
              inlineCode: {
                marker: '•',
              },
              extensions: ['noctis-theme'],
              replaceColor: (oldColor) =>
                ({
                  '#fa8900': 'var(--theme-link-color)',
                }[oldColor.toLowerCase()] || oldColor),
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
      __key: "posts"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/microblog/`,
        name: 'microblog',
      },
      __key: "microblog"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/data`,
        name: 'data',
      },
      __key: "data"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/`,
        name: 'pages',
      },
      __key: "pages"
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
