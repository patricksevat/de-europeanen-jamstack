import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import { EuropeanenCard } from '../components/EuropeanenCard'
import { EuropeanenNews } from '../components/EuropeanenNews';
import { EuropeanenBlog } from '../components/EuropeanenBlogs';

export const IndexPageTemplate = ({
  about_title,
  about_content,
  about_button_title,
  news_title,
  articles,
  blogs,
  totalBlogs,
  authors,
}) => {
  const blogCount = blogs?.length;

  return (
    <section id="main" className="section">
      <div className="eu-columns">
        <EuropeanenCard
          id="about-card"
          type={'other'}
          title={about_title}
          headerColor={'yellow'}
          body={about_content}
        >
          <button className="button is-link is-outlined">
            { about_button_title }
          </button>
        </EuropeanenCard>
        <EuropeanenCard
          id="news-card"
          type={'other'}
          title={news_title}
          headerColor={'yellow'}
        >
          <EuropeanenNews
            articles={articles}
          ></EuropeanenNews>
        </EuropeanenCard>
        <EuropeanenBlog
          blogs={blogs}
          authors={authors}
        ></EuropeanenBlog>
      </div>

      { totalBlogs > blogCount && (
        <div className="container">
          <Link to="/blog/2" className="level-item">
            <button className="button is-link is-outlined">Meer artikelen</button>
          </Link>
        </div>
      )}
    </section>

  )
};

IndexPageTemplate.propTypes = {
  about_title: PropTypes.string,
  about_content: PropTypes.string,
  about_button_title: PropTypes.string,
  news_title: PropTypes.string,
  totalBlogs: PropTypes.number,
  blogs: PropTypes.arrayOf(PropTypes.object),
};

const IndexPage = ({ data }) => {
  const { frontmatter: pageFrontmatter } = data.markdownRemark;
  const authors = data.authors.nodes;
  const [ articles, setArticles ] = useState([]);

  useEffect(() => {
    fetch('https://gnews.io/api/v3/search?q=europese%20unie&lang=nl&country=nl&token=13d58f0196dde3c51da76a6d1363cb1b')
    .then((response) => response.json())
    .then((json) => {
      setArticles(json.articles);
    })
  }, []);

  return (
    <Layout>
      <IndexPageTemplate
        {...pageFrontmatter}
        articles={articles}
        blogs={data.allMarkdownRemark.edges}
        totalBlogs={data.allMarkdownRemark.totalCount}
        authors={authors}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number,
      frontmatter: PropTypes.object,
      fields: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
          about_title
          about_content
          about_button_title
          news_title
      }
    }
    allMarkdownRemark(
        sort: {
            order: DESC, fields: [frontmatter___date]
        }
        filter: {
            frontmatter: {
                templateKey: {
                    eq: "blog-post"
                }
            }
        }
        limit: 6
    ) {
        totalCount
        edges {
            node {
                fields {
                    slug
                }
                frontmatter {
                    title
                    date
                    tags
                    description
                    author
                    featuredimage {
                        childImageSharp {
                            fluid(maxWidth: 400) {
                                src
                                srcSet
                            }
                        }
                    }
                    featuredimage_alt
                }
            }
        }
    }
    authors: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "author"}}}) {
        nodes {
            frontmatter {
                name
                job_title
                profile_picture {
                    childImageSharp {
                        original {
                            src
                        }
                    }
                }
            }
        }
    }
  }
`
