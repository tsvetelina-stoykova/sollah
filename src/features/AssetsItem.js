import { Link } from "react-router-dom";
import  "./AssetsItem.css";

const AssetsItem = ({asset}) => {
  return (
	<section className='row pb-5'>
		<div className='col-12 col-lg-3 asset-image-wrapper'>
			<Link to={`/${asset ? asset.id : "Loading"}`}>				
				<img className='asset-thumb-image' src={asset ? asset.thumb_url : "Loading"} />
			</Link>
		</div>
		<div className='col-12 col-lg-7'>
			<Link to={`/${asset ? asset.id : ""}`}>				
				<h2 className='asset-title pb-2'>{asset ? asset.title : 'Loading'}</h2>
			</Link>	
			<p className='asset-description'>{asset ? asset.description : "Loading"}</p>
		</div>
		<div className='col-12 col-lg-2'>
			<div><span><b>Type: </b>{asset ? asset.type : "Loading"}</span></div>
			<div><span><b>Topic: </b>{asset ? asset.topic : "Loading"}</span></div>
		</div>
	</section>
  )
}

export default AssetsItem