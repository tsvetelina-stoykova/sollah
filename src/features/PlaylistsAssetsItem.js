import { useDispatch } from "react-redux";
import { togglePlaylist } from "../app/playlistsSlice";
import { Link } from "react-router-dom";
import  "./AssetsItem.css";

const PlaylistsAssetsItem = ({asset, playlist, playlist_id}) => {
	const dispatch = useDispatch();
	const handleDelete = () => {
		dispatch(togglePlaylist({asset_id: asset.id, playlist_id, add: false}))
	}

  return (
	<section className='row pb-5'>
		<div className='col-12 col-lg-3 asset-image-wrapper'>
			<Link to={`/${asset ? asset.id : "Loading"}`}>				
				<img className='asset-thumb-image' src={asset ? asset.thumb_url : "Loading"} />
			</Link>
		</div>
		<div className="col-12 col-lg-9 asset-description-wrapper">
			<div className="pb-2">
				<Link to={`/${asset ? asset.id : ""}`} className="asset-title">				
					<h2 className="pb-2">{asset ? asset.title : 'Loading'}</h2>
				</Link>
				<p className="asset-description">{asset ? asset.description : "Loading"}</p>
			</div>
			<div className="asset-specifics">
				<div><span><b>Type: </b>{asset ? asset.type : "Loading"}</span></div>
				<div><span><b>Topic: </b>{asset ? asset.topic : "Loading"}</span></div>
			<button onClick={handleDelete} className="button button-delete">Delete Asset</button>
			</div>
		</div>
	</section>
  )
}

export default PlaylistsAssetsItem