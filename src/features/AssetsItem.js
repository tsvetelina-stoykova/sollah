import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import  "./AssetsItem.css";

const AssetsItem = ({asset}) => {
  return (
	<Row>
		<Col>
			<Link to={`/${asset ? asset.id : "Loading"}`}>				
				<img  alt="Asset thumbnail" src={asset ? asset.thumb_url : "Loading"} />
			</Link>
		</Col>
		<Col>
			<div className="pb-2">
				<Link to={`/${asset ? asset.id : ""}`}>				
					<h2 className="pb-2">{asset ? asset.title : 'Loading'}</h2>
				</Link>
				<p >{asset ? asset.description : "Loading"}</p>
			</div>
			<div >
				<div><span><b>Type: </b>{asset ? asset.type : "Loading"}</span></div>
				<div><span><b>Topic: </b>{asset ? asset.topic : "Loading"}</span></div>
			</div>
		</Col>
	</Row>
  )
}

export default AssetsItem