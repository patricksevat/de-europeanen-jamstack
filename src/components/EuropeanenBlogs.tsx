import React, { FunctionComponent } from 'react';
import { EuropeanenCard } from './EuropeanenCard';
import { IBlog } from '../types';

interface IBlogProps {
  blogs: IBlog[]
}

export const EuropeanenBlog: FunctionComponent<IBlogProps> = ({ blogs }) => {
  if (!blogs || !blogs.length) {
    return null;
  }

  return (
    <div>
      { blogs.map((blog, index) => {
        const { slug: path} = blog.node.fields;
        const { title, date, tags, description, featuredimage, featuredimage_alt } = blog.node.frontmatter;
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
          >
          </EuropeanenCard>
        )
      })}
    </div>
  )
};
