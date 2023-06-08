import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAsset } from "../../app/assetsSlice";
import { togglePlaylist, listPlaylists } from "../../app/playlistsSlice";
import { useParams } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import AssetComponent from "../../features/AssetComponent";
import "./AssetDetails.css";
import { Dropdown } from "react-bootstrap"; 
import { DropdownButton } from "react-bootstrap"; 

const AssetDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const asset = useSelector((state) => state.assets.map[id]);
	const playlists = useSelector((state) => state.playlists);
	const [currentLang, setCurrentLang] = useState("English");
	const [openPlaylist, setOpenPlaylist] = useState(false);

	const filtered = useMemo(() => {
		return asset?.components ?
			asset.components.filter(c => (c.lang === currentLang)) :
			[];
	}, [asset?.components, currentLang]);

	const langs = useMemo(() => {
		return asset?.components ?
			asset.components.map(c => c.lang).reduce((langs, l) => (langs.includes(l) ? langs : [...langs, l]), []) :
			[];
	}, [asset?.components]);

	useEffect(() => {
		if (!(asset && asset.components)) dispatch(getAsset({ id }));
	}, [dispatch, id, asset]);


	const handleFilterBtn = (e) => {
		setCurrentLang(e.target.value);
	};

	useEffect(() => {
		if (playlists.status === '') dispatch(listPlaylists());
	}, [dispatch, playlists]);

	const isLiked = playlists.map.liked ?
		playlists.map.liked.asset_ids.includes(id) :
		false;
	
	const handleLike = () => {
		dispatch(togglePlaylist({ asset_id: id, playlist_id: 'liked', add: !isLiked }));
	};

	const handleOpen = () => {
		setOpenPlaylist(!openPlaylist);
	};
	
	return (
		<>{asset ?
			(
				<div className="container page-content justify-content-center">
					<div className="row">
						<div className="col-4">
							<img className="asset-thumbnail" src={asset.thumb_url_big} alt="thumbnail" />
						</div>
						<div className="col-8 post-heading mb-3">
							<h2 className="pb-2">{asset.title}</h2>
							<p className="asset-description">{asset.description}</p>
							<div className="pt-3 row">
								<button onClick={handleLike} className="btn-favourites mr-3">
									{isLiked ? 
										<span className="d-flex align-items-center"><IoMdHeart className="mr-1" size="1.7em" />Liked</span> : 
										<span className="d-flex align-items-center"><IoMdHeartEmpty className="mr-1" size="1.7em" />Like</span>}									 
								</button>

								<div className="playlist-dropdown">
									<button onClick={handleOpen} className=" d-flex btn-playlist">
										<span className="m-auto">Add to Playlist</span>
										<MdOutlineKeyboardArrowDown className="ml-1" size="1.7em"/>
									</button>
								</div>
								<DropdownButton  id="dropdown-basic-button" title="Add to Playlist">
								{ 
									playlists.mine.map((pid) => {
										const p = playlists.map[pid];
										const added = p.asset_ids.includes(id);
										return p.id > 0 ? 
										(
											<Dropdown.Item key={p.id} onChange={(e) => { 
												dispatch(togglePlaylist({asset_id:id, playlist_id:pid, add: !added}));
											}}>{p.name}</Dropdown.Item>
										) : null;
									}) 
								}
								</DropdownButton>
							</div>
							{/* <div className="playlist-wrapper">
								{openPlaylist ? 
									playlists.mine.map((pid) => {
										const p = playlists.map[pid];
										const added = p.asset_ids.includes(id);
										return p.id > 0 ? (<div className="playlist-checkbox" key={p.id}>
											<label>
												<input type="checkbox" value={p.id} checked={added} onChange={e => {
													dispatch(togglePlaylist({asset_id:id, playlist_id:pid, add: !added}));
												}}/>
												{" "}{p.name}
											</label>
										</div>) : null;
									}) : null
								}
							</div> */}
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
								{asset.learning_paths ?
									<ul>{asset.learning_paths.map(p => <li key={p}>{p}</li>)}</ul> :
									"Loading "
								}
							</div>

							<div>
								<h3>Main Topic</h3>
								<ul><li>{asset.topic}</li></ul>
							</div>

							<div>
								<h3>Other Topics</h3>
								{asset.other_topics ?
									<ul>{asset.other_topics.map(t => <li key={t}>{t}</li>)}</ul> :
									"Loading"
								}
							</div>

							<div>
								<h3>Competences</h3>
								{asset.competencies ?
									<ul>{asset.competencies.map(c => <li key={c}>{c}</li>)}</ul> :
									"Loading"
								}
							</div>

							<div>
								<h3>Suggested Industry Usage</h3>
								{asset.industry_settings ?
									<ul>{asset.industry_settings.map(s => <li key={s}>{s}</li>)}</ul> :
									"Loading"
								}
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

					<div className="row my-4">
						<div className="col-12 mb-2">
							<h2>Training files</h2>
						</div>
						{langs.map(lang => (
							<div className="col-4" key={lang}>
								<button onClick={handleFilterBtn} type="button" value={lang}>{lang}</button>
							</div>
						))}
					</div>

					<div className="components-wrapper">
						<h2>Components</h2><br />
						{filtered.length ?
							filtered.map(component => <AssetComponent key={component.id} component={component} />) :
							"Loading"
						}
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