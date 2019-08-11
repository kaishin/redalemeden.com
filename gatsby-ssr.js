const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link rel="alternate" type="application/rss+xml" href="feed.xml" key="1" />,
    <link rel="alternate" type="application/json" href="feed.json" key="2" />,
    <link rel="alternate" type="application/rss+xml" href="microblog.xml" key="3" />,
    <link rel="alternate" type="application/json" href="microblog.json" key="4" />
  ]);
};
