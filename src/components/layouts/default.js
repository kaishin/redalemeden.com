import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../header';
import Footer from '../footer';
import Navigation from '../navigation';
import Seo from '../seo';

import '../../css/normalize.css';
import '../../css/styles.css';

import 'typeface-rubik';
import 'typeface-fira-mono';

class DefaultLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                author
                description
                keywords
                title
              }
            }
          }
        `}
        render={(data) => (
          <section className="grid-container">
            <Seo />
            <Header {...data.site.siteMetadata} />
            <Navigation />
            <main className="main-container">{children}</main>
            <Footer {...data.site.siteMetadata} />
          </section>
        )}
      />
    );
  }
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DefaultLayout;
