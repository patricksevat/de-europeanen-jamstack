import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { EuropeanenCard } from '../components/EuropeanenCard';
import './about-page.scss';

interface IAboutCard {
  html: string,
  frontmatter: {
    title: string,
    featuredimageAlt: string,
    featuredimage: {
      childImageSharp: {
        fluid: {
          src: string,
          srcSet: string,
        }
      }
    }
  }
}

interface IAboutPage {
  title: string,
  content: string,
  cards: IAboutCard[],
}

export const AboutPageTemplate: FunctionComponent<IAboutPage> = ({ title, content, cards }) => {

  return (
    <section id="main" className="section">
      <EuropeanenCard
        id="about-main-card"
        type={'other'}
        title={title}
        headerColor={'yellow'}
        body={content}
      />

      <div className="eu-columns">
        { cards?.length && cards.map(card => (
          <EuropeanenCard
            id="about-card"
            key={card.frontmatter.title}
            type={'other'}
            title={card.frontmatter.title}
            image={card.frontmatter.featuredimage.childImageSharp.fluid}
            imgAlt={card.frontmatter.featuredimageAlt}
            headerColor={'yellow'}
            body={card.html}
          />
        ))}
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: page, allMarkdownRemark: cards } = data;

  return (
    <Layout>
      <h1 className="page-header is-size-2 has-text-white has-text-centered">Over de Europeanen</h1>
      <AboutPageTemplate
        title={page.frontmatter.title}
        content={page.html}
        cards={cards.nodes}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "about-card"}}}) {
      nodes {
        html
        frontmatter {
          title
          featuredimage_alt
          featuredimage {
            childImageSharp {
              fluid(maxWidth: 400) {
                src
                srcSet
              }
            }
          }
        }
      }
    }
  }
`
