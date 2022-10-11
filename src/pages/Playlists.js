import { useDispatch, useSelector } from "react-redux";
import { listPlaylists } from "../app/playlistsSlice";
import { useEffect } from "react";

const Playlists = () => {
	const dispatch = useDispatch();
	const playlists = useSelector((state) => state.playlists);
	useEffect( () => { dispatch(listPlaylists()) }, [dispatch]);
	// console.log(playlists.);



	return (
		<div className="row">
			<div className="col-12">
				<h3 className="pb-3">Playlists</h3>
				{playlists.mine.map( (pl) => <p key={pl.id}>{pl.name} - {pl.asset_ids.length}</p> )}
			</div>
		</div>
	)
}

export default Playlists