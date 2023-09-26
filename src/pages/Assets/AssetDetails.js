import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAsset } from "../../app/assetsSlice";
import { getCategories } from '../../app/categoriesSlice';
import { togglePlaylist, listPlaylists } from "../../app/playlistsSlice";
import { useParams } from "react-router-dom";
import AssetComponent from "../../features/AssetComponent";
import debounce from '../../features/debounce';
import AssetsFilter from "../../features/AssetsFilter";
import { DropdownButton, Col, Row, Container, Image, Breadcrumb, Dropdown, Stack, Button, InputGroup, Form } from "react-bootstrap"; 
import { MdSearch } from "react-icons/md";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./AssetDetails.css";

const AssetDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const asset = useSelector((state) => state.assets.map[id]);
	const assets = useSelector((state) => state.assets);
	const playlists = useSelector((state) => state.playlists);
	const categories = useSelector((state) => state.categories);
	const [currentLang, setCurrentLang] = useState("English");
	const [openPlaylist, setOpenPlaylist] = useState(false);


	const filtered_components = useMemo(() => {
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
					<Row style={{paddingBottom: "1em"}}>
						<Breadcrumb>
							<Breadcrumb.Item href="http://dev.stoikova.com:3000/">
								Video Library
							</Breadcrumb.Item>
							<Breadcrumb.Item active>{ asset.title }</Breadcrumb.Item>
						</Breadcrumb>
					</Row>
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
									
															
							</Row>
							<Row className="section-title-bg"><h5>Training files</h5></Row>
							<Row className="section-content-bg">				
								{langs.map((lang) => (
									<Col key={lang} sm={4} >
										<Button variant="link"  onClick={handleFilterBtn} value={lang}>{lang}</Button>
									</Col>
								))}	
								<h5>Components</h5><br />
								
									{filtered_components.length ?
										filtered_components.map(component => <AssetComponent key={component.id} component={component} />) :
										"Loading"
									}
								
							</Row>
							<Row className="section-related-title"><h5>Related Programs & Training Ideas</h5></Row>
							<Row xs="4" sm={3} style={{backgroundColor: "#f4f4f4"}}>
								{	asset.related_assets 
									? asset.related_assets.map( related => <Col key={related.id} className="related-asset-tile">
											<div className="related-asset-img">
												<a href={'http://dev.stoikova.com:3000/' + related.id}>
													<Image src={related.thumb_url} alt="Related Asset" />
												</a>
												
											</div>								
											<div className="related-asset-desc">
												<a href={'http://dev.stoikova.com:3000/' + related.id}>{related.title}</a>
												<small>{related.type}</small>
											</div>
										</Col>
									 )
									: ""
								}
							
								
							</Row>
						</Col>	
						<Col sm={4}>
							<div className="filter-wrapper">
								<h5>Search Assets</h5>
								<InputGroup className="mb-2">
									<InputGroup.Text>
										<MdSearch size="2em" color="#ccc"/>
									</InputGroup.Text>
									<Form.Control placeholder="Keywords"
									/>
								</InputGroup>
							
								<div>
									<AssetsFilter
										label="Learning Paths"
										options={categories.learning_path.all}
										empty={"- ALL " + categories.learning_path.plural + " -"}
									/>
								</div>
								<div>
									<AssetsFilter
										label="Types"
										options={categories.type.all}
										empty={"- ALL " + categories.type.plural + " -"}
									/>
								</div>
								<div>
									<AssetsFilter
										label="Topics"
										options={categories.topic.all}
										empty={"- ALL " + categories.topic.plural + " -"}
									/>
								</div>
								<div>
									<AssetsFilter
										label="Suggested Industry Usage"
										options={categories.industry_setting.all}
										empty={"- ALL " + categories.industry_setting.plural + " -"}
									/>
								</div>
								<div>
									<AssetsFilter
										label="Target Audiences"
										options={categories.target_audience.all}
										empty={"- ALL " + categories.target_audience.plural + " -"}
									/>
								</div>
								<div>
									<AssetsFilter
										label="Languages"
										options={categories.language.all}
										empty={"- ALL " + categories.language.plural + " -"}
									/>
								</div>
							</div>
						</Col>
					</Row>

				</Container>
			)
			:
			(<span>Not Found</span>)
		}
		</>
	)
}

export default AssetDetails