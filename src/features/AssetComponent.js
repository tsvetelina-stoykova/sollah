import {FaPlayCircle} from "react-icons/fa"
import "./AssetComponent.css";
import Video from "../assets/vid1.mp4";
import { MdClose } from "react-icons/md";
import { getPlayUrl } from "../app/assetsSlice";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";


const AssetComponents = ({component}) => {
	const dispatch = useDispatch();
	const {id} = useParams();
	const [selected, setSelected] = useState(false);

	const handlePlayer = (e) => {
		e.preventDefault();
		const play_id = component.id; 
		console.log("id",id, "play_id", play_id);
		dispatch(getPlayUrl({id, play_id}));
		setSelected(true);
		console.log("play",play.url)
	};
	const play = useSelector( (state) => state.assets.play );
	const handleClose = () => {
		setSelected(false);
	}


	return (
		<section className="container">
			<div className="row my-3">
				<div className="col-2">
					<a onClick={handlePlayer} className="d-flex video-link">
						<FaPlayCircle size="3em"/>
						<span className="pl-2 align-self-center"><b>Demo</b></span>
					</a>
				</div>
				<div className="col-4">
					<h3 className="component-title">{component.title}</h3>
					<span className="component-description">{component.description}</span>
				</div>
				<div className="col-3">
					<span>{component.runtime !== "0" ?  (component.runtime/60).toFixed(2) + " min" 
							: component.pages > 1  ? component.pages + " pages" : component.pages + " page"}</span>
				</div>
				<div className="col-3">
					<span>{component.lang}</span>
				</div>
			</div>
			<div style={selected == 1 ? {visibility: "visible", opacity: "1"} : undefined} className="video-modal-screen">
				<MdClose className="video-modal-close-btn" onClick={handleClose}/>
				<div className="video-modal-content">
					<video className="modal-video" width={play ? play.width : "faafasfaf"} height={play ? play.height : ""} controls>
						<source src={play ? play.url : "Loading"} type="video/mp4" />
						Your browser does not support video tag.
					</video>
				</div>
			</div>
		</section>
		
	)
}

export default AssetComponents