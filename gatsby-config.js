module.exports = {
  siteMetadata: {
    description: 'Personal Site of Reda Lemeden',
    title: 'Reda Lemeden',
    author: 'Reda Lemeden',
    keywords: [ 'reda', 'kaishin', 'lemeden', 'developer', 'designer', 'kaishinlab' ],
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
    'gatsby-plugin-postcss',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 740,
              quality: 90,
              wrapperStyle: 'margin-top: 3rem'
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static'
            }
          },
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool'
            }
          },
          'gatsby-remark-abbr',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false
            }
          },
          'gatsby-remark-prismjs'
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts/`,
        name: 'posts'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/data`,
        name: 'data'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://redalemeden.com'
      }
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        trackingUrl: 'stats.redalemeden.com',
        siteId: 'VKAGX'
      }
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: false
      }
    }
  ]
};
