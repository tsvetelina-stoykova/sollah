import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPlaylists } from "../app/playlistsSlice";
import { getAssetsByIds } from "../app/assetsSlice";
import PlaylistsAssetsItem from '../features/PlaylistsAssetsItem';
import "./Playlists.css"

const Playlists = () => {
	const [playlist_id, setCurrentTab] = useState('liked');
	const [created, setCreated] = useState(null);
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

	const handleCreate = (e) => {
		e.preventDefault()
		console.log("newplaylist", created)
	}
	
	return (
		<div className="container-md">
			<div className="row page-content">
				<div className="col-3">
					<div className="tab">
						<div className="create-playlist">
							<form onSubmit={handleCreate}>
								<input defaultValue={created} onChange={(e) => setCreated(e.target.value)}/>
								<input type="submit" value="Create Playlist" className="button" />
							</form>
						</div>
						{playlists.mine.map((id) => (
							<a key={id} onClick={()=>{handleTab(id)}} className={`playlists-btn ${playlist_id===id?'selected-btn':''}`}>
								{playlists.map[id].name}
							</a>
						))}
					</div>
					<div className="shared-title"><h2>Shared Playlists</h2></div>
					
					<div className="tab">								
						{playlists.shared.map((id) => (
							<a key={id} onClick={()=>{handleTab(id)}} className={`playlists-btn ${playlist_id===id?'selected-btn':''}`}>
								{playlists.map[id].name}
							</a>
						))}
					</div>
				</div>
				<div className="tab-content">
					{playlist ? 
					<>				 							
						{playlist.asset_ids.map(id => assets.map[id] ?
							<PlaylistsAssetsItem key={id} asset={assets.map[id]} playlist={playlist} playlist_id={playlist_id}></PlaylistsAssetsItem> :
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