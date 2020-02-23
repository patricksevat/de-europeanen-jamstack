import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import EuropeanenBlogMeta from '../components/EuropeanenBlogMeta';
import EuropeanenBlogImage from '../components/EuropeanenBlogImage';
import { IEuropeanenAuthor } from '../types';

import './blog-post.scss';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  helmet,
  author,
  image,
  image_alt,
  attachment,
  attachmentDescription,
  comments,
}) => {
  const PostContent = contentComponent || Content

  return (
    <Fragment>
      <EuropeanenBlogImage
        image={image}
        alt={image_alt}
      >
      </EuropeanenBlogImage>
      <EuropeanenBlogMeta
        comments={comments}
        author={author}
        attachment={attachment}
        attachmentDescription={attachmentDescription}
        title={title}
      ></EuropeanenBlogMeta>
      <section className="eu_blog section">
        {helmet || ''}
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1 is-6-desktop is-offset-3-desktop">
              <PostContent content={content} className={'blog-body'} />
              {tags && tags.length ? (
                <div style={{ marginTop: `4rem` }}>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map(tag => (
                      <li key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

BlogPostTemplate.propTypes = {
  attachment: PropTypes.object,
  attachmentDescription: PropTypes.string,
  image: PropTypes.object,
  image_alt: PropTypes.string,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = (props) => {
  const author: IEuropeanenAuthor = props.pageContext.author.node;
  const post = props.data.markdownRemark;

  return (
    <Layout>
      <BlogPostTemplate
        image={post.frontmatter.featuredimage}
        image_alt={post.frontmatter.featuredimage_alt}
        attachment={post.frontmatter.attachment}
        attachmentDescription={post.frontmatter.attachment_description}
        content={post.html}
        contentComponent={HTMLContent}
        author={author}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        comments={0}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        description
        author
        featuredimage {
            childImageSharp {
                fluid(maxHeight: 400) {
                    src
                    srcSet
                }
            }
        }
        featuredimage_alt
        attachment {
          publicURL
        }
        attachment_description
        # comments
      }
    }
  }
`
