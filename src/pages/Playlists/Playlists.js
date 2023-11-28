import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPlaylists, createPlaylist, updatePlaylist, deletePlaylist } from "../../app/playlistsSlice";
import { getAssetsByIds } from "../../app/assetsSlice";
import PlaylistsAssetsItem from '../../features/PlaylistsAssetsItem';
import { Container, Row, Col, Badge, InputGroup, Button, Form } from "react-bootstrap";
import PlaceholderAsset from "../../features/PlaceholderAsset";
import EmptyPlaylist from "../../features/EmptyPlaylist";
import { MdDelete, MdModeEdit } from "react-icons/md";
import "./Playlists.css";

const Playlists = () => {
	const [playlist_id, setCurrentTab] = useState('liked');
	const [created, setCreated] = useState(null);
	const [showEdit, setShowEdit] = useState(false);
	const dispatch = useDispatch();
	const playlists = useSelector((state) => state.playlists);
	const assets = useSelector((state) => state.assets);

	const playlist = playlist_id ? playlists.map[playlist_id] : null;

	const missing_ids = playlist ? playlist.asset_ids.filter((id)=>!assets.map[id]) : [];


	useEffect(() => { dispatch(listPlaylists()) }, [dispatch]);

	useEffect(() => { 
		if(missing_ids.length) dispatch(getAssetsByIds({ids:missing_ids}));
		}, [dispatch, missing_ids]);

	const handleTab = (playlist_id) => {
		setCurrentTab(playlist_id);
	};

	const handleCreate = (e) => {
		e.preventDefault()
		dispatch(createPlaylist({name:created}));
	};


	const handlePlaylistDelete = () => {
		dispatch(deletePlaylist({playlist_id}));
	};	

	const showEditField = () => {
		setShowEdit(!showEdit);
	};

	const handlePlaylistRename = (e) => {
		e.preventDefault();
		const obj = {};
		Array.from(new FormData(e.target)).forEach(f => { obj[f[0]] = f[1]; });
		dispatch(updatePlaylist({playlist_id, name: obj.name}));
		setShowEdit(false);
	};

	return (
		<Container>
			<Row className="page-content">
				<Col sm={3} xxs={12}>
					<div className="tab">
						<div className="create-playlist">
							<form onSubmit={handleCreate}>
								<input defaultValue={created} onChange={(e) => setCreated(e.target.value)}/>
								<input type="submit" value="Create Playlist" className="button" />
							</form>
						</div>
						{playlists.mine.map((id) => (
							<div key={id} className={` playlists-btn ${playlist_id===id ? "selected-btn" : null}`}>							
								<a href="#" onClick={()=>{handleTab(id)}}>
									{playlists.map[id].name}									
								</a>
								<Badge className="ms-1" pill bg="secondary">{playlists.map[id].asset_ids.length}</Badge>				
								<div className="pt-2">
									{(playlist_id===id)									
										? <> 
											<div className="d-flex playlist-actions">
												<span onClick={showEditField} className="d-flex align-items-center me-1"><MdModeEdit size="1.3em" color="grey"/>Rename</span> 
												<MdDelete onClick={handlePlaylistDelete} size="1.3em" color="red"/>						
										  	</div>
										  	{showEdit && 
											<Form onSubmit={handlePlaylistRename}>
												<InputGroup  className="mb-3">													
													<Form.Control
														aria-label="Recipient's username"
														aria-describedby="basic-addon2"
														name="name"
													/>
													<Button variant="secondary" type="submit" id="button-addon2">
														Save
													</Button>													
												</InputGroup>
											</Form>
											} 
										</>
										: null}
										
								</div>
							</div>
						))}
					</div>
					<div className="shared-title"><h2>Shared Playlists</h2></div>
					
					<div className="tab">								
						{playlists.shared.map((id) => (
							<a key={id} href="#" onClick={()=>{handleTab(id)}} className={`playlists-btn ${playlist_id===id?'selected-btn':''}`}>
								{playlists.map[id].name}
							</a>
						))}
					</div>
				</Col>
				<Col sm={9} xxs={12}>
					{playlist?.asset_ids.length === 0 
						? <EmptyPlaylist/>
						: playlist?.asset_ids.map(id => assets.map[id] 
							? <PlaylistsAssetsItem key={id} asset={assets.map[id]} playlist={playlist} playlist_id={playlist_id}></PlaylistsAssetsItem>
							: <PlaceholderAsset key={id} />
						)
					}
				</Col>
			</Row>
		</Container>
	)
}

export default Playlists