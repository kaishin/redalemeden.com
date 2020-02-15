import React, { Component } from 'react';

export class PathWidget extends Component {
  render() {
    this.props.value = this.props.value ? this.props.value : `${'post-' + Date.now().toString()}`;
    return <div>{this.props.value}</div>;
  }
}
