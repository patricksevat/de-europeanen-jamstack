import React, { FunctionComponent } from 'react';
import './europeanen-blog-image.scss';

interface IBlogImgProps {
  image: {
    childImageSharp: {
      fluid: {
        src: string,
        srcSet: string
      }
    }
  };
  alt: string;
}

const EuropeanenBlogImage: FunctionComponent<IBlogImgProps> = ({ image, alt }) => {
  console.log({ image, alt });

  return (
    <div className="hero">
      <img
        className="eu_blog_img"
        src={image.childImageSharp.fluid.src}
        srcSet={image.childImageSharp.fluid.srcSet}
        alt={alt}
      />
    </div>
  );
};

export default EuropeanenBlogImage;