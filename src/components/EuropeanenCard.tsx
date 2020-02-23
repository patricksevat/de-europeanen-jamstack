import React, { FunctionComponent } from 'react';
import { IEuropeanenAuthor } from '../types';
import EUFlag from '../img/eu-flag.svg'
import './europeanen-card.scss'
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

type HTMLString = string;

interface IArticleMetadata {
  date: string,
  tags: string[],
  comments: number,
}

interface ICardProps {
  id?: string,
  type: 'blog' | 'other',
  title: string,
  image?: {
    src: string,
    srcSet: string
  },
  imgAlt?: string,
  headerColor: 'yellow' | 'red' | 'blue',
  author?: IEuropeanenAuthor,
  body?: HTMLString,
  metadata?: IArticleMetadata,
  link?: string,
}

export const EuropeanenCard: FunctionComponent<ICardProps> = (props) => {
  return (
    <section className="eu_card" id={props.id}>
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
        <div className="eu_card-img_wrapper">
            <img
              className="eu_card-image"
              src={ props?.image?.src || EUFlag }
              srcSet={ props?.image?.srcSet }
              alt={ props.imgAlt || 'Foto behorend bij artikel'}
            />
          {!!props.author && (
            <div className="eu_card-author">
              <img
                className="eu_card-author_profile_img"
                src={ props.author?.frontmatter?.profile_picture?.childImageSharp?.original?.src }
                alt={ `Foto van ${props.author.frontmatter.name}, auteur van dit artikel`}
              />
              <div className="eu_card-author_bio">
                <span className="eu_card-author-name has-text-white">
                  { props.author.frontmatter.name }
                </span>
                <br/>
                <span className="eu_card-author-job-title has-text-white is-size-7">
                  { props.author.frontmatter.job_title }
                </span>
              </div>

            </div>
          )}
        </div>
      )}
      {!!props.body &&
        <div className="eu_card-body" dangerouslySetInnerHTML={{
          __html: props.body
        }}></div>
      }
      {!!props.metadata &&
        <div className="eu_card-metadata">
          <span className="eu_card-date is-size-7 has-text-grey-light">
            {new Date(props.metadata.date).toLocaleDateString('nl-NL', {day: 'numeric', month: 'long', year: 'numeric'})}
          </span>
          <br/>
          {props.metadata.tags &&
            <span className="eu_card-date is-size-7 has-text-grey-light">
              # {props.metadata?.tags?.map((tag, i) => {
                if (!tag) { return null }

                return (
                  <Link key={tag} to={`/tags/${kebabCase(tag)}`}>
                    <div className="eu_card-tag has-text-grey-light">{ tag }</div>
                  </Link>
                )
                })}
            </span>
          }
        </div>
      }
      <div className="eu_card-footer">
        { props.children }
      </div>
    </section>
  )
};