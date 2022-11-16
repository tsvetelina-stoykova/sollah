import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPlaylists } from "../app/playlistsSlice";
import { getAssetsByIds } from "../app/assetsSlice";
import AssetsItem from '../features/AssetsItem';
import "./Playlists.css"

const Playlists = () => {
	const [playlist_id, setCurrentTab] = useState('liked');
	const dispatch = useDispatch();
	const playlists = useSelector((state) => state.playlists);
	const assets = useSelector((state) => state.assets);
	const playlist = playlist_id ? playlists.map[playlist_id] : null;

	const missing_ids = playlist ? playlist.asset_ids.filter((id)=>!assets.map[id]) : [];
	// const missing_ids = useCallback(() => {
	// 	return playlist ? playlist.asset_ids.filter((id)=>!assets.map[id]) : [];
	// }, [playlist, assets.map]) 

	useEffect(() => { dispatch(listPlaylists()) }, [dispatch]);
	useEffect(() => { 
		if(missing_ids.length) dispatch(getAssetsByIds({ids:missing_ids}));
		}, [dispatch, missing_ids]);

	const handleTab = (playlist_id) => {
		setCurrentTab(playlist_id);
	}
	
	return (
		<div className="row">
			<div className="container-md page-content">
				<div className="col-3 tab">
					{playlists.mine.map((id) => (
						<a key={id} onClick={()=>{handleTab(id)}} className={`playlists-btn ${playlist_id===id?'selected-btn':''}`}>
							{playlists.map[id].name}
						</a>
					))}
					<h3>Shared Playlists</h3>								
					{playlists.shared.map((id) => (
						<a key={id} onClick={()=>{handleTab(id)}} className={`playlists-btn ${playlist_id===id?'selected-btn':''}`}>
							{playlists.map[id].name}
						</a>
					))}
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