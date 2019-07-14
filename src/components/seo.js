import React from 'react';
import Helmet from 'react-helmet';
import Config from '../../gatsby-config.js';
import PropTypes from 'prop-types';

class Seo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const metadata = Config.siteMetadata;
    const description = this.state.description === undefined ? metadata.description : this.state.description;
    const title = this.state.title === undefined ? metadata.title : metadata.title + ' | ' + this.state.title;
    const keywords = this.state.keywords === undefined ? [] : this.state.keywords;

    return (
      <Helmet
        htmlAttributes={{
          lang: 'en'
        }}
        title={title}
        meta={[
          { name: 'robots', content: 'noodp, noydir' },
          { name: 'description', content: description },
          { name: 'keywords', content: keywords.concat(metadata.keywords).join(', ') }
        ]}
      >
        <noscript />
      </Helmet>
    );
  }
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string)
};

export default Seo;
