import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMessages } from "../../app/messagesSlice";
import { Container, Badge, Accordion, Stack, Row, Col } from "react-bootstrap";
import { IoMailOpen, IoMailUnread } from "react-icons/io5";
import "./Messages.css";
import {createElement} from 'react';

const Messages = () => {
	const messages = useSelector((state) => state.messages);
	return (createElement(
		'div', {className: 'container'}, createElement(
			'h3', {className: 'sub-heading'}, 'Inbox ', createElement(
				'em', null, messages.allMessages.length),
		))
	)
}

export default Messages

// const dispatch = useDispatch();
// const messages = useSelector((state) => state.messages);
// useEffect(() => { dispatch(listMessages()) }, [dispatch]);
// const options = { year: 'numeric', month: 'short', day: 'numeric' };
	// return (
	// 	<Container className="message-container">
			
	// 		<p>Inbox <Badge bg="secondary">{messages.allMessages.length}</Badge></p>
	// 		<Row   className="justify-content-md-center">
	// 			<Col sm={7} >
	// 				Subject
	// 			</Col>
	// 			<Col sm={3}>From</Col>
	// 		</Row>
	// 		<Row className="justify-content-md-center">		
	// 				<Accordion defaultActiveKey={['0']} alwaysOpen>
	// 					{messages.allMessages.map( (msg) =>											
	// 							<Accordion.Item className="w-100" key={msg.id} eventKey={msg.id}>
	// 								<Accordion.Header>
	// 									<Stack direction="horizontal" gap={3} className="message-synopsis">
	// 										<IoMailOpen className="icon-read" size="1.2rem"/>
	// 										<h5>{msg.subject}</h5>
	// 										<p>{msg.from}</p>
	// 										<span>{new Date(msg.timestamp * 1000).toLocaleDateString('en-US', options)}</span>
	// 									</Stack>
	// 								</Accordion.Header>
	// 								<Accordion.Body>
	// 									<Row className="justify-content-md-center">
	// 										<Col sm={11}>
	// 											<p className="message-text">{new DOMParser().parseFromString(msg.message, "text/html").documentElement.textContent}</p>
	// 										</Col>
	// 									</Row>
	// 								</Accordion.Body>
	// 							</Accordion.Item>
	// 					)}
	// 				</Accordion>
	// 		</Row>
			
				
	// 	</Container>
	//   )

