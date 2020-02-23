import React, { FunctionComponent } from 'react';
import './europeanen-blog-image.scss';
import EUFlag from '../img/eu-flag.svg'

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
  return (
    <div className="hero">
      <img
        className="eu_blog_img"
        src={image?.childImageSharp?.fluid?.src || EUFlag }
        srcSet={image?.childImageSharp?.fluid?.srcSet}
        alt={alt}
      />
    </div>
  );
};

export default EuropeanenBlogImage;