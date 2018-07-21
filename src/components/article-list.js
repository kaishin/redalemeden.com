import React from 'react'

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <ol className="article-list">
        {this.state.articles.map(({ article }, id) =>
          <li class="article">
            <a href={article.url} class="article-link">
              <h6 class="article-title">
                {article.title}
              </h6>
              <div class="article-metadata">
                <span class="article-source">{article.outlet_name}</span> – <time>{article.formattedDate}</time>
              </div>
            </a>
          </li>
        )}
      </ol>
    )
  }
}

export default ArticleList
