import { useDispatch, useSelector } from "react-redux";
import { listPlaylists } from "../app/playlistsSlice";
import { useEffect } from "react";
import "./Playlists.css"

const Playlists = () => {
	const dispatch = useDispatch();
	const playlists = useSelector((state) => state.playlists);
	useEffect( () => { dispatch(listPlaylists()) }, [dispatch]);
	console.log(playlists);



	return (
		// <div className="row">
		// 	<div className="col-12">
		// 		<h3 className="pb-3">Playlists</h3>
		// 		{playlists.mine.map( (pl) => <p key={pl.id}>{pl.name} - {pl.asset_ids.length}</p> )}
		// 	</div>
		// </div>
		<div>
			<h3 className="mb-3">Playlists</h3>
			<div className="tab">
				{playlists.mine.map((p) => <button key={p.id} className="playlists-btn">{p.name}</button>)}
			</div>
			<div className="tabcontent"></div>
		</div>
	)
}

export default Playlists