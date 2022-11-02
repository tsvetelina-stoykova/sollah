import { useState } from "react";
import { Link } from "react-router-dom";
import {FaPlayCircle} from "react-icons/fa"
import "./AssetComponent.css";

const AssetComponents = ({assetDetail}) => {
	// const [currentVideo, setCurrentVideo] = useState();
	const handlePlayer = (e) => {
		console.log(e);
	}
	// console.log(currentVideo);
	return (
		<section className="container">
			<div className="row my-3">
				<div className="col-2">
					<a onClick={handlePlayer} className="d-flex video-link">
						<FaPlayCircle size="3em"/>
						<span className="pl-2 align-self-center"><b>Demo</b></span>
					</a>
					
					{/* <video width="320" height="240" controls>
						<source src={`/play/${assetDetail.id}`} type="text/html" />
						<source src="#" type="video/ogg" />
						Your browser does not support the video tag.
					</video>  */}
					
				</div>
				<div className="col-4">
					<h3 className="component-title">{assetDetail.title}</h3>
					<span className="component-description">{assetDetail.description}</span>
				</div>
				<div className="col-3">
					<span>{assetDetail.runtime !== "0" ?  (assetDetail.runtime/60).toFixed(2) + " min" 
							: assetDetail.pages > 1  ? assetDetail.pages + " pages" : assetDetail.pages + " page"}</span>
				</div>
				<div className="col-3">
					<span>{assetDetail.lang}</span>
				</div>
			</div>
		</section>
		
	)
}

export default AssetComponents