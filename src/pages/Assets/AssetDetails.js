import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAsset } from "../../app/assetsSlice";
import { togglePlaylist, listPlaylists } from "../../app/playlistsSlice";
import { useParams } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import AssetComponent from "../../features/AssetComponent";
import "./AssetDetails.css";
import { DropdownButton, Col, Row, Container, Dropdown, Stack, Button, ListGroup  } from "react-bootstrap"; 

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
				<Container>
					<Row>
						<Col sm={8}>
							<Row>
								<Col sm={4}>
									<img className="asset-thumbnail" src={asset.thumb_url_big} alt="thumbnail" />		
								</Col>
								<Col sm={8}>
									<h2 className="asset-detail-title pb-2">{asset.title}</h2>
									<p >{asset.description}</p>
									<Stack direction="horizontal" gap={3}>
										<Button onClick={handleLike}>
											{isLiked ? 
												<span className="d-flex justifycontent-center"><IoMdHeart className="pe-1" size="1.5em"/>Liked</span> :
												<span className="d-flex justifycontent-center"><IoMdHeartEmpty className="mr-2" size="1.5em"/>Like</span> }
										</Button>
										<DropdownButton  id="dropdown-basic-button" title="Add to Playlist">
											{ 
												openPlaylist ?											
												playlists.mine.map((pid) => {
													const p = playlists.map[pid];
													const added = p.asset_id.includes(id);
													return p.id > 0 ? (
														<div key={p.id}>
															<label><input type="checkbox" value={p.id} checked={added} onChange={e => {
																dispatch(togglePlaylist({asset_id:id, playlist_id:pid, add: !added}));
															}}/>{" "}{p.name}</label>
														</div>
													) : null
												}) : null
											}
										</DropdownButton>									
									</Stack>
								</Col>
							
									<Col sm={3} className="mt-5">
										<h5>Learning Path & Details</h5>
										<ul>
											{asset.learning_paths ?
												asset.learning_paths.map(p => <li key={p}>{p}</li>) :
												"Loading "
											}
											<b>Type:</b> {asset.type}
											<b>Audiance:</b> {asset.target_audience}
										</ul>
									</Col>
									<Col sm={3} className="mt-5">
										<h5>Topics</h5>
										<ul><li><b>{asset.topic}</b></li>
											{asset.other_topics ?
												asset.other_topics.map(t => <li key={t}>{t}</li>):
												"Loading"
											}
										</ul>
									</Col>
									<Col sm={3} className="mt-5">
										<h5>Suggested Industry Usage</h5>
										{asset.industry_settings ?
											<ul>{asset.industry_settings.map(s => <li key={s}>{s}</li>)}</ul> :
											"Loading"
										}
									</Col>
									<Col sm={3} className="mt-5">
										<h5>Competences</h5>
										{asset.competencies ?
											<ul>{asset.competencies.map(c => <li key={c}>{c}</li>)}</ul> :
											"Loading"
										}
									</Col>
									
									<h5>Training files</h5>
									{langs.map((lang) => (
										<Col sm={4} >
											<Button variant="link" key={lang} onClick={handleFilterBtn} value={lang}>{lang}</Button>
										</Col>
									))}
								
								
							</Row>
						</Col>
						<Col sm={4}></Col>
					</Row>
					<br/><br/><br/>

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
				</Container>
			)
			:
			(<span>Not Found</span>)
		}
		</>
	)
}

export default AssetDetails