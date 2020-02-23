import React, { FunctionComponent } from 'react';
import { IEuropeanenAuthor } from '../types';
import './europeanen-author.scss';
import Paperclip from '../img/paperclip-solid.inline.svg';
import Comment from '../img/comments-solid.inline.svg';

interface IAuthorProps {
  author: IEuropeanenAuthor,
  attachment: {
    publicURL: string
  },
  attachmentDescription: string
  comments: number,
  title: string
}

const EuropeanenBlogMeta: FunctionComponent<IAuthorProps> = (props) => {
  const author = props.author.frontmatter;

  return (
    <section className="hero">
      <div className="eu_blog_meta hero-body">
        <div className="eu_blog_meta-wrapper">
          <h1 className="is-size-2 has-text-white eu_blog_meta-title">
            {props.title}
          </h1>
          <div className="eu_blog_meta-author_post_wrapper column is-10 is-offset-1 is-6-desktop is-offset-3-desktop">
            <div className="eu_blog_meta-author_wrapper">
              <img
                className="eu_blog_meta-profile_img"
                src={author.profile_picture.childImageSharp.original.src}
                alt={`Profielfoto van ${author.name}`}
              />
              <div className="eu_blog_meta-author_metadata has-text-white">
                <span>{ author.name }</span>
                <span className="eu_blog_meta-job_title">{ author.job_title }</span>
              </div>
            </div>

            <div className="eu_blog_meta-post_metadata has-text-white">
              <span>
                <Paperclip title={"Icoon van een paperclip, geeft een link naar een bijlage aan"}></Paperclip>
                <a target="_blank" href={props?.attachment?.publicURL}>
                  {props?.attachmentDescription}
                </a>
              </span>
              <span>
                <Comment title={"Icoon van een spraakwolk, geeft het aantal gebruikerscommentaren aan"}></Comment>
                {props.comments || '0' }
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
};

export default EuropeanenBlogMeta;

