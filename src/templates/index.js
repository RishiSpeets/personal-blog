import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ArticleList from '../components/ArticleList'
import Article from '../components/Article'
import Helmet from 'react-helmet'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import config from '../utils/siteConfig'

const Index = ({ data, pageContext }) => {
  const posts = data.allContentfulPost.edges
  const featuredPost = posts[0].node
  const { currentPage } = pageContext

  return (
    <Layout>
      <SEO />
      <Helmet>
        <title>{`${config.siteTitle} - Page ${currentPage}`}</title>
      </Helmet>
      <Container>
        <Fragment>
          <ArticleList>
            <Article {...featuredPost} featured />
            {posts.slice(1).map(({ node: post }) => (
              <Article key={post.id} {...post} />
            ))}
          </ArticleList>
        </Fragment>
      </Container>
      <Pagination context={pageContext} />
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          heroImage {
            title
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          body {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 0)
            }
          }
        }
      }
    }
  }
`

export default Index
