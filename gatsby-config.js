module.exports = {
  siteMetadata: {
    title: 'Reda Lemeden',
    author: 'Reda Lemeden',
    siteUrl: 'https://redalemeden.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-next',
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss-sass',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 740,
              quality: 90
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
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
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://redalemeden.com`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Fira Mono`,
          `Fira Sans\:300i,400,400i,500`
        ]
      },
    },
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        icon: false,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/data`,
        name: `data`,
      },
    },
  ]
};
