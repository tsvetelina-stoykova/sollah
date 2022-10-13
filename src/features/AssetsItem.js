import React from 'react'
import  './AssetsItem.css'

const AssetsItem = ({asset}) => {
  return (
	<section className='row pb-5'>
		<div className='col-12 col-lg-3 asset-image-wrapper'>
			<a href='#'>				
				<img className='asset-thumb-image' src={asset.thumb_url} />
			</a>
		</div>
		<div className='col-12 col-lg-7'>	
			<h2 className='asset-title pb-2'><a href='@'><span>{asset ? asset.title : 'Loading'}</span></a></h2>
			<p className='asset-description'>{asset.description}</p>
		</div>
		<div className='col-12 col-lg-2'>
			<div><span><b>Type: </b>{asset.type}</span></div>
			<div><span><b>Topic: </b>{asset.topic}</span></div>
		</div>
	</section>
  )
}

export default AssetsItem