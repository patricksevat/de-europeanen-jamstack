import React, { FunctionComponent } from 'react';
import { IEuropeanenAuthor } from '../types';
import './europeanen-author.scss';

interface IAuthorProps {
  author: IEuropeanenAuthor,
}

const EuropeanenAuthor: FunctionComponent<IAuthorProps> = (props) => {
  const author = props.author.frontmatter;

  return (
    <section className="hero">
      <div className="eu_author hero-body">
        <div className="eu_author-profile_picture_wrapper level-item">
          <img
            className="eu_author-profile_img"
            src={author.profile_picture.childImageSharp.original.src}
            alt={`Profielfoto van ${author.name}`}
          />
        </div>
        <div className="eu_author-metadata level-item has-text-white">
          <span>{ author.name }</span>
          <br/>
          <span>{ author.job_title }</span>
        </div>
      </div>
    </section>
  )
};

export default EuropeanenAuthor;

