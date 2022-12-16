import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMessages } from "../../app/messagesSlice";
import { Link } from "react-router-dom";
import { Container, Badge, Accordion, Stack, Row, Col } from "react-bootstrap";
import { IoMailOpen, IoMailUnread } from "react-icons/io5";
import "./Messages.css";

const Messages = () => {
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.messages);
	useEffect(() => { dispatch(listMessages()) }, [dispatch]);
	const options = { year: 'numeric', month: 'short', day: 'numeric' };

	return (
		<Container className="message-container">
			<p>Inbox <Badge bg="secondary">{messages.allMessages.length}</Badge></p>
			<Row   className="justify-content-md-center">
				<Col sm={7} >
					Subject
				</Col>
				<Col sm={3}>From</Col>
			</Row>
			<Row className="justify-content-md-center">
				<Col  sm={10}>
					<Accordion defaultActiveKey={['0']} alwaysOpen>
						{messages.allMessages.map( (msg) =>	
							<Accordion.Item key={msg.id} eventKey={msg.id}>
								<Accordion.Header>
									<Stack direction="horizontal" gap={3} className="message-synopsis">
										<IoMailOpen className="icon-read" size="1.2rem"/>
										<h5>{msg.subject}</h5>
										<p>{msg.from}</p>
										<span>{new Date(msg.timestamp * 1000).toLocaleDateString('en-US', options)}</span>
									</Stack>
								</Accordion.Header>
								<Accordion.Body>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
								minim veniam, quis nostrud exercitation ullamco laboris nisi ut
								aliquip ex ea commodo consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
								pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
								culpa qui officia deserunt mollit anim id est laborum.
								</Accordion.Body>
						</Accordion.Item>
						)}
					</Accordion>
				</Col>
			</Row>
			
				
		</Container>
	  )
}

export default Messages