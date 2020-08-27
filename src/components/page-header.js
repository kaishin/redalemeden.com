import React from 'react';

class PageHeader extends React.Component {
  render() {
    const { children, title } = this.props;

    return (
      <aside className="page-header">
        <h1>{title}</h1>
        <p className="page-description">{children}</p>
      </aside>
    );
  }
}

export default PageHeader;
