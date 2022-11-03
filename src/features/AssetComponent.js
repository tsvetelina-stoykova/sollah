import {FaPlayCircle} from "react-icons/fa"
import "./AssetComponent.css";
import Video from "../assets/vid1.mp4";
import { MdClose } from "react-icons/md";
import { getPlayUrl } from "../app/assetsSlice";
import { Link, useParams } from "react-router-dom"; 


const AssetComponents = ({assetDetail}) => {
	const {play_id} = useParams();
	console.log("id:", play_id)


	return (
		<section className="container">
			<div className="row my-3">
				<div className="col-2">
					<Link to={`/play/${assetDetail ? assetDetail.id : "Loading"}`} className="d-flex video-link">
						<FaPlayCircle size="3em"/>
						<span className="pl-2 align-self-center"><b>Demo</b></span>
					</Link>
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
			<div className="video-modal-screen">
				<MdClose/>
				<div className="video-modal-content">
					<video className="modal-video" width="320" height="240" controls>
						<source src={Video} type="video/mp4" />
						Your browser does not support video tag.
					</video>
				</div>
			</div>
		</section>
		
	)
}

export default AssetComponents