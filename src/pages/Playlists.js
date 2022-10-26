import { useDispatch, useSelector } from "react-redux";
import { listPlaylists } from "../app/playlistsSlice";
import { getAsset, getAssetsByIds } from "../app/assetsSlice";
import AssetsItem from '../features/AssetsItem';
import { useEffect, useState } from "react";
import "./Playlists.css"

const Playlists = () => {
	const [currentTab, setCurrentTab] = useState(0)
	const dispatch = useDispatch();
	const playlists = useSelector((state) => state.playlists);
	const assets = useSelector((state) => state.assets);
	const playlist = playlists.mine[currentTab];
	const missing_ids = playlist ? playlist.asset_ids.filter((id)=>!assets.map[id]) : [];

	useEffect(() => { dispatch(listPlaylists()) }, [dispatch]);

	useEffect(() => { 
		if(missing_ids.length) dispatch(getAssetsByIds({ids:missing_ids})); 
	}, [missing_ids]);

	const handleTab = (currentTab) => {
		setCurrentTab(currentTab)
	}

	return (
		<div>
			<h3 className="mb-3">Playlists</h3>
			<div className="tab">
				{playlists.mine.map((p, i) => <button key={p.id} className="playlists-btn" onClick={() => {handleTab(i)}}>{p.name}</button>)}
			</div>
			<div className="tabcontent">
				{playlist ? 
					<>
						<p>{playlist.name}</p> 
						{playlist.asset_ids.map(id => assets.map[id] ?
							<AssetsItem key={id} asset={assets.map[id]} /> :
							<p key={id}>Asset missing: {id}</p>
						)}
					</>
					:
					<p>Loading</p>
				}
			</div>
		</div>
	)
}

export default Playlists