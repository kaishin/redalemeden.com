import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WidegamutPathWidget extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
    setActiveStyle: PropTypes.func.isRequired,
    setInactiveStyle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: 'post-' + Date.now().toString(),
  };

  render() {
    const { forID, value, onChange, classNameWrapper, setActiveStyle, setInactiveStyle } = this.props;

    return (
      <input
        type="text"
        id={forID}
        className={classNameWrapper}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
      />
    );
  }
}
