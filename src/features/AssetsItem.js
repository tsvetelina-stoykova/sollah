import { Link } from "react-router-dom";
import { Row, Col, Image, Card, Placeholder } from "react-bootstrap";
import  "./AssetsItem.css";

const escapeRegExp = (s) => {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const highlightAsset = ({title, description}, keywords) => {
	const words = keywords
					.trim()
					.split(/\s+/)
					.filter(a => a.length)
					.map(escapeRegExp);
	if(words.length) {
		const regex = new RegExp(`(${words.join("|")})`, "gi");
		title = title.replace(regex, '<mark>\$1</mark>');
		description = description.replace(regex, '<mark>\$1</mark>');
	}
	return {title, description};	
}

const AssetsItem = ({asset, filter=null}) => {
	if(!asset) {
		return <AssetsItemPlaceholder/>;
	}
	const {title, description} = filter ?
		highlightAsset(asset, filter.q) :
		asset;
	
	return (
		<Row className="py-3">
			<Col sm={3} className="justify-content-center">
				<Link to={'/' + asset.id} className={asset.thumb_url ? "asset-thumb-image" : null} style={{backgroundColor: asset.thumb_bg}}>
					<Image 
						src={asset.thumb_url ? asset.thumb_url : null}
						className={asset.popular || asset.new ? null : "image-border"}
						fluid width="200" height="150" />
					<span className={asset.popular ? "asset-badge asset-popular" : asset.new ? "asset-badge asset-new" : "asset-badge"}>
						{asset.popular ? "Most Popular" : asset.new ? "New Asset" : null}
					</span>
				</Link>
			</Col>
			<Col sm={9}>
				<Card>
					<Card.Body>
						<Card.Title className="asset-title">
							<Link to={'/' + asset.id} dangerouslySetInnerHTML={{__html: title}}></Link>
						</Card.Title>
						<Card.Text className="asset-description" dangerouslySetInnerHTML={{__html: description}}></Card.Text>
					</Card.Body>
					<Card.Footer className="asset-specifics">
						<div>
							<span><b>Type: </b>{asset.type}</span><br/>
							<span><b>Topic: </b>{asset.topic}</span>
						</div>
					</Card.Footer>
				</Card>
			</Col>
		</Row>
	)
}

const AssetsItemPlaceholder = () => {
	return (
		<Row className="py-3">
			<Col sm={3} className="justify-content-center">
				<Placeholder className="asset-thumb-image" animation="glow"  width="200" height="150"></Placeholder>	
			</Col>
			<Col sm={9}>
				<Card>
					<Card.Body>
						<Card.Title className="asset-title">
							<Placeholder sm={9} animation="wave"/> 
						</Card.Title>
						<Card.Text className="asset-description">
							<Placeholder sm={7} />
						</Card.Text>						
					</Card.Body>
					<Card.Footer className="asset-specifics">
						<Placeholder sm={7} />						
					</Card.Footer>
				</Card>
			</Col>
		</Row>
	)
}

export default AssetsItem