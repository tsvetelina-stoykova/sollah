import { Link } from "react-router-dom";
import { Row, Col, Image, Card, Placeholder } from "react-bootstrap";
import  "./AssetsItem.css";

const AssetsItem = ({asset}) => {
		return (
			<Row>
				<Col>
					{asset  
						? <Link to={asset.id}><Image src={asset.thumb_url ? asset.thumb_url : asset.thumb_bg } rounded fluid width="200" height="150"/></Link>
						: <Placeholder as={Image} animation="glow" rounded fluid width="200" height="150"></Placeholder>	
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
							<Card.Text className="asset-description">
								{asset
									? <p>{asset.description}</p>
									: <Placeholder sm={7} />
								}
							</Card.Text>
						</Card.Body>
						<Card.Footer className="asset-specifics">
							{asset 
								? <div><span><b>Type: </b>{asset.type}</span>
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