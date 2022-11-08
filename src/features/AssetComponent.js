import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlayUrl } from "../app/assetsSlice";
import { useParams } from "react-router-dom";
import {FaPlayCircle} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import "./AssetComponent.css";

const AssetComponents = ({component}) => {
	const dispatch = useDispatch();
	const {id} = useParams();
	const [selected, setSelected] = useState(false);

	const handlePlayer = (e) => {
		e.preventDefault();
		dispatch(getPlayUrl({asset_id:id, component_id:component.id}));
		setSelected(true);
	};
	
	const play_key = id + '/' + component.id;
	const play = useSelector( (state) => state.assets.play[play_key] );

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
			<div style={selected  ? {visibility: "visible", opacity: "1"} : undefined} className="video-modal-screen">
				<MdClose className="video-modal-close-btn" onClick={handleClose}/>
				<div className="video-modal-content">
					{ play 	? <video className="modal-video" width={ play.width } height={ play.height } controls>
								<source src={ play.url } />
							</video> 
							: <p>Loading</p>}					
				</div>
			</div>
		</section>
		
	)
}

export default AssetComponents