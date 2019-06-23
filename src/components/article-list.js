import React from 'react';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return (
      <ol className="article-list">
        {this.state.articles.map(({ article }, id) => (
          <li className="article" key={id}>
            <a href={article.url} className="article-link">
              <h6 className="article-title">{article.title}</h6>
              <div className="article-metadata">
                <span className="article-source">{article.outlet_name}</span> – <time>{article.formattedDate}</time>
              </div>
            </a>
          </li>
        ))}
      </ol>
    );
  }
}

export default ArticleList;
