import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAsset } from "../app/assetsSlice";
import { useParams } from "react-router-dom";
import "./AssetDetails.css";

const AssetDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const asset = useSelector((state) => state.assets.map[id]);
	useEffect(() => {
		if(!(asset && asset.components)) dispatch(getAsset({id}));
	}, [dispatch, id, asset]);

	return(
		<>{ asset ?
			(
			<div className="container page-content justify-content-center">
				<div className="row">					
						<div className="col-4">
							<img className="asset-thumbnail" src={asset.thumb_url_big} alt="thumbnail"/>
						</div>
						<div className="col-8 post-heading mb-3">
							<h2 className="pb-2">{asset.title}</h2>
							<p className="asset-description">{asset.description}</p>
						</div>
				</div>
				<div className="row asset-topics-wrapper">
					<div className="col-3">
						<h3 className="pb-3">Learning Path & Details</h3>
						<ul>
							<li>{asset.learning_paths}</li>
							<li>Type: {asset.type}</li>
							
						</ul>
					</div>
					<div className="col-3"></div>
					<div className="col-3"></div>
					<div className="col-3"></div>
				</div>
			</div>		
			)
			:
			(<span>Not Found</span>)
		}
		</>
	)
}

export default AssetDetails