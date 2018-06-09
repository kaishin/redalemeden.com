import React from 'react'
import Link from 'gatsby-link'
import Seo from '../components/seo'
import Helmet from 'react-helmet'

const BlogPage = () => (
  <header class="main-header">
    <Helmet bodyAttributes={{class: "blog-page"}}/>
    <Seo title='Blog' bodyClass='blog' />
    <h1>Blog</h1>
    <div>Hello blog</div>
  </header>
)

export default BlogPage
