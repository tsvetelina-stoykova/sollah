import { Link } from "react-router-dom";
import { Row, Col, Image, Card, Placeholder } from "react-bootstrap";
import  "./AssetsItem.css";

function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function mark(s) {
	return `<mark>${s}</mark>`;
}

const AssetsItem = ({asset, filter }) => {
	const words = filter.q.trim().split(/\s+/).filter(s=>s.length).map(escapeRegExp);
	const regex = words.length ? new RegExp(`(${words.join("|")})`, "gi") : null;

	let title = '';
	let description = '';
	if(asset) {
		title = asset.title;
		description = asset.description;
		if(regex) {
			title = asset.title.replace(regex, mark);
			description = asset.description.replace(regex, mark);
		}
	}

	return (
			<Row className="py-3">
				<Col sm={3} className="justify-content-center">
					{asset  
						? <Link to={asset.id} className={asset.thumb_url ? "asset-thumb-image" : null} style={ asset ? {backgroundColor: asset.thumb_bg} : null}>
							<Image src={asset.thumb_url ? asset.thumb_url : null}  className={asset.popular || asset.new ? null : "image-border"} fluid width="200" height="150" />
							<span className={asset.popular ? "asset-badge asset-popular" : asset.new ? "asset-badge asset-new" : "asset-badge"}>{asset.popular ? "Most Popular" : asset.new ? "New Asset" : null}</span>
						</Link>
						: <Placeholder className="asset-thumb-image" animation="glow"  width="200" height="150"></Placeholder>	
					}
				</Col>
				<Col sm={9}>
					<Card>
						<Card.Body>
							<Card.Title className="asset-title">
								{asset
									? <Link to={asset.id}    dangerouslySetInnerHTML={{__html: title}}></Link>
									: <Placeholder sm={9} animation="wave"/>  
								}
							</Card.Title>
							
								{asset
									? <Card.Text className="asset-description" dangerouslySetInnerHTML={{__html: description}}></Card.Text>
									: <Card.Text className="asset-description"><Placeholder sm={7} /></Card.Text>
								}						
						</Card.Body>
						<Card.Footer className="asset-specifics">
							{asset 
								? <div><span><b>Type: </b>{asset.type}</span><br/>
								  <span><b>Topic: </b>{asset.topic}</span></div>
								: <Placeholder sm={7} />
							}							
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		)
	}

export default AssetsItem