import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listPlaylists } from "../app/playlistsSlice";
import { getAssetsByIds } from "../app/assetsSlice";
import AssetsItem from '../features/AssetsItem';
import "./Playlists.css"

const Playlists = () => {
	const [currentTab, setCurrentTab] = useState(0);
	const dispatch = useDispatch();
	const playlists = useSelector((state) => state.playlists);
	const assets = useSelector((state) => state.assets);
	const playlist_id = playlists.mine[currentTab];
	const playlist = playlists.map[playlist_id];
	const missing_ids = playlist ? playlist.asset_ids.filter((id)=>!assets.map[id]) : [];

	useEffect(() => { dispatch(listPlaylists()) }, [dispatch]);
	useEffect(() => { 
		if(missing_ids.length) dispatch(getAssetsByIds({ids:missing_ids})); 
	}, [dispatch, missing_ids]);

	const handleTab = (currentTab) => {
		setCurrentTab(currentTab);
	}
	
	return (
		<div className="row">
			<div className="container-md page-content">
				<div className="col-3 tab">
					{playlists.mine.map((id, i) => <button key={id} onClick={() => {handleTab(i)}} className="playlists-btn">{playlists.map[id].name}</button>)}								
					<h3>Shared Playlists</h3>
				</div>
				<div className="tabcontent">
					{playlist ? 
					<>				 							
						{playlist.asset_ids.map(id => assets.map[id] ?
							<AssetsItem key={id} asset={assets.map[id]} playlist={playlist} playlist_id={playlist_id}></AssetsItem> :
							<p key={id}>Asset missing: {id}</p>
						)}
					</> :
					<p>Loading</p>
					}
	
				</div>
			</div>
		</div>
	)
}

export default Playlists