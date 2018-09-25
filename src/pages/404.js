import React from 'react'
import Helmet from 'react-helmet'
import DefaultLayout from '../components/layouts/default.js'

const NotFoundPage = () => (
  <DefaultLayout>
    <div>
      <Helmet bodyAttributes={{ class: "page-base" }} />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </DefaultLayout>
)

export default NotFoundPage
