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
    const title = this.state.title === undefined ? metadata.title : this.state.title;
    const keywords = this.state.keywords === undefined ? [] : this.state.keywords;
    const meta = this.state.meta === undefined ? [] : this.state.meta;
    const image = this.state.image ? this.state.image : 'social-card.jpg';

    return (
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
        title={title}
        meta={[
          { name: 'robots', content: 'noodp, noydir' },
          { name: 'description', content: description },
          { name: 'keywords', content: keywords.concat(metadata.keywords).join(', ') },
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:type', content: 'website' },
          { property: 'og:image', content: `${metadata.siteUrl}/${image}` },
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:creator', content: '@kaishin' },
          { name: 'twitter:site', content: '@kaishin' },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: description },
          { name: 'twitter:image', content: `${metadata.siteUrl}/${image}` },
        ].concat(meta)}
      >
        <noscript />
      </Helmet>
    );
  }
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

export default Seo;
