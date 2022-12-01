import { Row, Col, Placeholder, Card } from "react-bootstrap";

const PlaceholderAsset = () => {
	return(
		<Row sm={9} xxs={12} className="py-3">
			<Col sm={3} className="justify-content-center">
				<Placeholder className="asset-thumb-image" animation="glow"  width="200" height="150"></Placeholder>	
			</Col>
			<Col sm={9}>
				<Card>
					<Card.Body>
						<Card.Title>
							<Placeholder sm={9} animation="wave"/>
						</Card.Title>
						<Card.Text>
							<Placeholder sm={7} />
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<Placeholder sm={7} />
					</Card.Footer>
				</Card>
			</Col>
		</Row>
	)
}

export default PlaceholderAsset