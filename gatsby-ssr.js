const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link rel="alternate" type="application/rss+xml" href="feed.xml" />,
    <link rel="alternate" type="application/json" href="feed.json" />,
    <link rel="alternate" type="application/rss+xml" href="microblog.xml" />,
    <link rel="alternate" type="application/json" href="microblog.json" />
  ]);
};
