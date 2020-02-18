import React, { FunctionComponent } from 'react';
import { IEuropeanenAuthor } from '../types';
import EUFlag from '../img/eu-flag.svg'
import './europeanen-card.scss'
import { Link } from 'gatsby';

type HTMLString = string;

interface IArticleMetadata {
  date: string,
  tags: string[],
  comments: number,
}

interface ICardProps {
  type: 'blog' | 'other',
  title: string,
  image?: {
    src: string,
    srcSet: string
  },
  imgAlt?: string,
  headerColor: 'yellow' | 'red' | 'blue',
  author?: IEuropeanenAuthor,
  body: HTMLString,
  metadata?: IArticleMetadata,
  link?: string,
}

export const EuropeanenCard: FunctionComponent<ICardProps> = (props) => {
  console.log({props})
  return (
    <section className="eu_card">
      <header className={`eu_card-header eu_card-header--${props.headerColor}`}>
        { props.link ?
          <Link to={props.link}>
            <h2 className="eu_card-header-title is-size-5">{ props.title }</h2>
          </Link>
        :
          <h2 className="eu_card-header-title is-size-5">{ props.title }</h2>
        }

      </header>
      { props.type === 'blog' && (
        <figure className="eu_card-image">
          <img
            src={ props?.image?.src || EUFlag }
            srcSet={ props?.image?.srcSet }
            alt={ props.imgAlt || 'Foto behorend bij artikel'}
          />
        </figure>
      )}
      {!!props.author && (
        <div className="eu_card-author">
          <figure className="eu_card-author_profile_img">
            <img
              src={ props.author.profileImg}
              alt={ `Foto van ${props.author.name}, auteur van dit artikel`}
            />
          </figure>
          <span className="eu_card-author-name">{ props.author.name }</span>
          <span className="eu_card-author-job-title">{ props.author.jobTitle }</span>
        </div>
      )}
      {!!props.body &&
        <div className="eu_card-body" dangerouslySetInnerHTML={{
          __html: props.body
        }}></div>
      }
      <div className="eu_card-footer">
        { props.children }
      </div>
    </section>
  )
};