import { Link } from "react-router-dom";
import { Row, Col, Image, Card, Placeholder } from "react-bootstrap";
import  "./AssetsItem.css";

const AssetsItem = ({asset}) => {
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
									? <Link to={asset.id}>{asset.title}</Link>
									: <Placeholder sm={9} animation="wave"/>  
								}
							</Card.Title>
							
								{asset
									? <Card.Text className="asset-description">{asset.description}</Card.Text>
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