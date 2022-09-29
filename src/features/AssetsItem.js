import React from 'react'
import  './AssetsItem.css'

const AssetsItem = ({asset}) => {
  return (
	<section className='asset row'>
		<div className='col-12 col-sm-5 col-md-3'>
			<a href='#'>
				<div className='asset-thumb-image'>
					<img src={asset.thumb_url} width='320' height='240'/>
				</div>
			</a>
		</div>
		<div className='col-12 col-sm-7 col-md-6'>
			<h2>
				<a href='@'>
					<span>{asset ? asset.title : 'Loading'}</span>
				</a>
			</h2>
			<p>{asset.description}</p>
		</div>
		<div className='col-12 col-md-3'>
			<div className='asset-attributes'>
				<span><b>Type: </b>{asset.type}</span>
				<span><b>Topic: </b>{asset.topic}</span>
			</div>
		</div>
	</section>
  )
}

export default AssetsItem