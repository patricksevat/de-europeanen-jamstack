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
  articles
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
    </div>
  )
}

IndexPageTemplate.propTypes = {
  about_title: PropTypes.string,
  about_content: PropTypes.string,
  about_button_title: PropTypes.string,
  news_title: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
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
        {...frontmatter}
        articles={articles}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
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
  }
`
