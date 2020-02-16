import React, { FunctionComponent } from 'react';
import './europeanen-news.scss';

interface INewsProps {
  articles: INewsArticleProps[]
}

interface INewsArticleProps {
  title: string,
  url: string,
  publishedAt: string,
}

export const EuropeanenNews: FunctionComponent<INewsProps> = (props => {
  if (props.articles.length === 0) {
    return (
      <div className="skeleton"></div>
    )
  }

  return <div>
    {
      props.articles.map((article) => {
        const date = new Date(article.publishedAt);
        const formattedDate = date.toLocaleString('nl-NL', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'})

        return (
          <NewsArticle
            key={article.url}
            title={article.title}
            publishedAt={formattedDate}
            url={article.url}
          ></NewsArticle>
        )
      })
    }
  </div>
});

const NewsArticle: FunctionComponent<INewsArticleProps> = (props => {
  return (
    <div className="eu_news">
      <a
        href={props.url}
        className="eu_news-link has-text-grey-dark is-size-6"
      >
        {props.title}
      </a>
      <small className="eu_news-date is-size-7">
        { props.publishedAt }
      </small>
    </div>
  )
});