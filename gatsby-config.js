module.exports = {
  siteMetadata: {
    title: 'Reda Lemeden',
    author: 'Reda Lemeden'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    }
  ]
};
