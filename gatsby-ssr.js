const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link rel="alternate" key="gatsby-feed-rss" type="application/rss+xml" href="feed.xml" />,
    <link rel="alternate" key="gatsby-feed-json" type="application/json" href="feed.json" />
  ]);
};
