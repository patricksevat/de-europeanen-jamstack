import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { EuropeanenCard } from '../components/EuropeanenCard'
import { EuropeanenNews } from '../components/EuropeanenNews';

export const IndexPageTemplate = ({
  about_title,
  about_content,
  about_button_title,
  news_title,
  articles,
  blogs,
}) => {
  return (
    <div className="eu-columns container">
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
      { blogs && blogs.map((blog, index) => {
        const { slug: path} = blog.node.fields;
        const { title, date, tags, description } = blog.node.frontmatter;
        return (
          <EuropeanenCard
            type="blog"
            title={title}
            // image={}
            // imgAlt={}
            metadata={{
              date,
              tags
            }}
            headerColor={ index % 2 ? 'yellow' : 'red'}
            body={description}
            link={path}
          >
          </EuropeanenCard>
        )
      })}
    </div>
  )
}

IndexPageTemplate.propTypes = {
  about_title: PropTypes.string,
  about_content: PropTypes.string,
  about_button_title: PropTypes.string,
  news_title: PropTypes.string,
  blogs: PropTypes.arrayOf(PropTypes.object),
};

const IndexPage = ({ data }) => {
  console.log({data})
  const { frontmatter: pageFrontmatter } = data.markdownRemark;
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
        limit: 10
    ) {
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
                }
            }
        }
    }
  }
`
