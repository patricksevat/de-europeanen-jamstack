import React, { FunctionComponent, Fragment } from 'react';
import { EuropeanenCard } from './EuropeanenCard';
import { IBlog, IEuropeanenAuthor } from '../types';

interface IBlogProps {
  blogs: IBlog[],
  authors: IEuropeanenAuthor[],
}

export const EuropeanenBlog: FunctionComponent<IBlogProps> = ({ blogs, authors }) => {
  if (!blogs || !blogs.length) {
    return null;
  }

  return (
    <Fragment>
      { blogs.map((blog: IBlog, index) => {
        const { slug: path} = blog.node.fields;
        const { title, date, tags, description, featuredimage, featuredimage_alt, author: authorName } = blog.node.frontmatter;
        const author = authors.find(author => author.frontmatter.name === authorName);
        return (
          <EuropeanenCard
            type="blog"
            title={title}
            image={featuredimage?.childImageSharp?.fluid}
            imgAlt={featuredimage_alt}
            metadata={{
              date,
              tags,
              comments: 0
            }}
            headerColor={ index % 2 ? 'blue' : 'red'}
            body={description}
            link={path}
            key={path}
            author={author}
          >
          </EuropeanenCard>
        )
      })}
    </Fragment>
  )
};
