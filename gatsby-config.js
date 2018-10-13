module.exports = {
  siteMetadata: {
    description: 'Personal Site of Reda Lemeden',
    title: 'Reda Lemeden',
    author: 'Reda Lemeden',
    keywords: [
      'reda',
      'kaishin',
      'lemeden',
      'developer',
      'designer',
      'kaishinlab'],
    siteUrl: 'https://redalemeden.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sharp',
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-feed',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 740,
              quality: 90
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static'
            }
          },
          'gatsby-remark-abbr',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs'
        ]
      }
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
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Fira Mono',
          'Fira Sans\:300i,400,400i,500'
        ]
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: false,
      },
    },
    'gatsby-plugin-netlify'
  ]
};
