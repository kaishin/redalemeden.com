import React from 'react';
import PropTypes from 'prop-types';
import Seo from '../seo';

import '../../css/styles.css';
import 'typeface-rubik';

class StandaloneLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <Seo />
        {children}
      </React.Fragment>
    );
  }
}

StandaloneLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default StandaloneLayout;
