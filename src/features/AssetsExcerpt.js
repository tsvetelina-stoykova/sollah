import React from 'react'

const AssetsExcerpt = ({asset}) => {
  return (
	<article>
		<h3>{asset ? asset.title : 'Loading'}</h3>
	</article>
  )
}

export default AssetsExcerpt