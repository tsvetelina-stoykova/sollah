import {Row, Col, Nav, Container} from "react-bootstrap";
import { MdFolderSpecial } from "react-icons/md" 

const EmptyPlaylist = () => {
	return(
		<Container>
			<Row xs={12}>
				<MdFolderSpecial  className="mt-5" size="5em" color="lightgrey"/>
			</Row>
			<Row>
				<Col xs={6} className="text-center">
					<h1 className="my-4">Playlist is empty</h1>
					<p> Browse and add assets to the playlist.</p>
				</Col>
			</Row>
			<Row>
				<Col xs={6} className="text-center">
					<Nav.Item as="button" className="btn btn-cta">
						<Nav.Link href="/">Browse Assets</Nav.Link>
					</Nav.Item>
				</Col>
			</Row>
		</Container>
	)
}

export default EmptyPlaylist