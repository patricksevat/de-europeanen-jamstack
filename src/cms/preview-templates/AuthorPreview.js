import React from 'react'
import PropTypes from 'prop-types'

const AuthorPreview = ({ entry, widgetFor }) => {
  // const tags = entry.getIn(['data', 'tags'])
  // return (
  //   <BlogPostTemplate
  //     content={widgetFor('body')}
  //     description={entry.getIn(['data', 'description'])}
  //     tags={tags && tags.toJS()}
  //     title={entry.getIn(['data', 'title'])}
  //   />
  // )
  return (
    <p>Hello world</p>
  )
}

AuthorPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default AuthorPreview
