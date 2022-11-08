import { useSelector, useDispatch } from "react-redux";
import { getPlayUrl } from "../app/assetsSlice";
import { useParams } from "react-router-dom";
import  movie from "../assets/icons/mov-cc.png"
import  pdf from "../assets/icons/pdf.png"
import  ppt from "../assets/icons/ppt.png"
import "./AssetComponent.css";
import Player from "./Player";

const AssetComponent = ({component}) => {
	const dispatch = useDispatch();
	const {id} = useParams();

	const handlePlayer = (e) => {
		e.preventDefault();
		dispatch(getPlayUrl({asset_id:id, component_id:component.id}));
	};

	const play_key = id + '/' + component.id;
	const play = useSelector( (state) => state.assets.play[play_key] );
	return (
		<section className="container asset-component">
			<div className="row my-3">
				<div className="col-2">
					<a onClick={handlePlayer} className="d-flex video-link">
						{component.doc === "video" ? <img src={movie}/> : component.doc === "pdf" ? <img src={pdf}/> : <img src={ppt}/>}
						<span className="pl-2 align-self-center"><b>Demo</b></span>
					</a>
				</div>
				<div className="col-5">
					<h3 className="component-title">{component.title}</h3>
					<span className="component-description">{component.description}</span>
				</div>
				<div className="col-2">
					<span>{component.runtime !== "0" ?  (component.runtime/60).toFixed(2) + " min" 
							: component.pages > 1  ? component.pages + " pages" : component.pages + " page"}</span>
				</div>
				<div className="col-2">
					<span>{component.lang}</span>
				</div>
			</div>
				<Player component={component} play={play}/>
		</section>
		
	)
}

export default AssetComponent