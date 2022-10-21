import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAsset } from "../app/assetsSlice";
import { useParams } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { RiPlayList2Fill } from "react-icons/ri"
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
							<div className="pt-3 row">
								<button className="btn-favourites mr-3"><IoMdHeartEmpty className="mr-1" size="1.7em"/><span className="m-auto">Add to Favourites</span></button>
								<button className="btn-playlist"><span className="m-auto">Add to Playlist</span></button>
							</div>
						</div>
				</div>
				<div className="row asset-topics-wrapper">
					<div className="columns m-auto">
							<div>
							<h3>Type</h3>
							<ul><li>{asset.type}</li></ul>
							</div>

							<div>					
							<h3>Learning Paths</h3>
							<ul>{asset.learning_paths.map(p => <li key={p}>{p}</li>)}</ul>
							</div>

							<div>
							<h3>Main Topic</h3>
							<ul><li>{asset.topic}</li></ul>
							</div>

							<div>				
							<h3>Other Topics</h3>
							<ul>{asset.other_topics.map(t => <li key={t}>{t}</li>)}</ul>
							</div>

							<div>				
							<h3>Competences</h3>
							<ul>{asset.competencies.map(c => <li key={c}>{c}</li>)}</ul>
							</div>

							<div>					
							<h3>Suggested Industry Usage</h3>
							<ul>{asset.industry_settings.map(s => <li key={s}>{s}</li>)}</ul>						
							</div>

							<div>						
							<h3>Subject</h3>
							<ul><li>{asset.subject}</li></ul>
							</div>

							<div>
							<h3>Program</h3>
							<ul><li>{asset.source_program}</li></ul>
							</div>

					</div>
				</div>
				<div className="components-wrapper">
					<h2>Components</h2>
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