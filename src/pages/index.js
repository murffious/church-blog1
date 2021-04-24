// import React from "react";
// import {createMemoryHistory} from "history";
// import {Route, Router, Switch} from "react-router-dom";

// import "assets/scss/material-kit-react.scss?v=1.4.0";
// import 'typeface-roboto';
// import 'typeface-roboto-slab';
// // pages for this product
// import Components from "./Components/Components.jsx";
// import LandingPage from "./LandingPage/LandingPage.jsx";
// import ProfilePage from "./ProfilePage/ProfilePage.jsx";
// import LoginPage from "./LoginPage/LoginPage.jsx";

// let hist = createMemoryHistory();

// export default () => (
//   <Router history={hist}>
//     <Switch>
//       <Route path="/landing-page" component={LandingPage} />
//       <Route path="/profile-page" component={ProfilePage} />
//       <Route path="/login-page" component={LoginPage} />
//       <Route path="/" component={Components} />
//     </Switch>
//   </Router>
// );


/*!

=========================================================
* Material Kit PRO React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
import {createMemoryHistory} from "history";

import { Router, Route, Switch } from "react-router";

import "../assets/scss/material-kit-pro-react.scss?v=1.9.0";

// pages for this product
import AboutUsPage from "../views/AboutUsPage/AboutUsPage.js";
import BlogPostPage from "../views/BlogPostPage/BlogPostPage.js";
import BlogPostsPage from "../views/BlogPostsPage/BlogPostsPage.js";
import ErrorPage from "../views/ErrorPage/ErrorPage.js";

import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import SEO from 'react-seo-component'
import styled from 'styled-components'
import { Layout } from '../components/Layout'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
// var hist = createBrowserHistory();


const IndexWrapper = styled.main``

const PostWrapper = styled.div``

const Image = styled(Img)`
  border-radius: 5px;
`
let hist = createMemoryHistory();
// export default () => (
//   <Router history={hist}>
//     <Switch>
//       <Route path="/about-us" component={AboutUsPage} />
//       <Route path="/blog-post" component={BlogPostPage} />
//       <Route path="/blog-posts" component={BlogPostsPage} />
//       <Route path="/error-page" component={ErrorPage} />
//       <Route path="/" component={BlogPostsPage} />
//     </Switch>
//   </Router>
// );




export default ({ data }) => {
  const {
    description,
    title,
    image,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
  } = useSiteMetadata()
  return (
    <Layout>
      <SEO
        title={title}
        description={description || `nothin’`}
        image={`${siteUrl}${image}`}
        pathname={siteUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
      />
      <IndexWrapper>
        {/* <Dump data={data}></Dump> */}
        {data.allMdx.nodes.map(
          ({ id, excerpt, frontmatter, fields }) => (
            <PostWrapper key={id}>
              <Link to={fields.slug}>
                {!!frontmatter.cover ? (
                  <Image
                    sizes={frontmatter.cover.childImageSharp.sizes}
                  />
                ) : null}
                <h1>{frontmatter.title}</h1>
                <p>{frontmatter.date}</p>
                <p>{excerpt}</p>
              </Link>
            
            </PostWrapper>
          )
        )}
      </IndexWrapper>
      <Router history={hist}>
              <Switch>
                <Route path="/about-us" component={AboutUsPage} />
                <Route path="/blog-post" component={BlogPostPage} />
                <Route path="/blog-posts" component={BlogPostsPage} />
                <Route path="/error-page" component={ErrorPage} />
                <Route path="/" component={BlogPostsPage} />
              </Switch>
            </Router> 
    </Layout>
  )
}

export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
          cover {
            publicURL
            childImageSharp {
              sizes(maxWidth: 2000, traceSVG: { color: "#639" }) {
                ...GatsbyImageSharpSizes_tracedSVG
              }
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`
