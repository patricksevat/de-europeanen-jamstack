import React, { FunctionComponent } from 'react'

import Layout from '../components/Layout'
import { EuropeanenBlog } from '../components/EuropeanenBlogs';
import { graphql } from 'gatsby';
import { IBlog } from '../types';

interface IBlogIndexTemplateProps {
  data: {
    allMarkdownRemark: {
      edges: IBlog[]
    }
  }
}

const BlogIndexTemplate: FunctionComponent<IBlogIndexTemplateProps> = (props) => {
  const blogs = props?.data?.allMarkdownRemark?.edges || [];
  const authors = props?.data?.authors?.nodes;
  return (
    <Layout>
      <h1 className="page-header is-size-2 has-text-white has-text-centered">Alle artikelen</h1>
      <section id="main" className="section">
        <div className="eu-columns">
          <EuropeanenBlog
            blogs={blogs}
            authors={authors}
          ></EuropeanenBlog>
        </div>
      </section>
    </Layout>
  )
}

export default BlogIndexTemplate;

// TODO authors query is no longer needed
// TODO add more button
export const pageQuery = graphql`
    query BlogOverviewTemplate($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            limit: $limit
            skip: $skip
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
