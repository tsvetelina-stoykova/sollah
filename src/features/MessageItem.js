import "./MessageItem.css";
import { IoMailOpen, IoMailUnread } from "react-icons/io5";
import { Link } from "react-router-dom";

const MessageItem = ({message}) => {
	console.log(message);
	const date = new Date(message.timestamp * 1000);

	if(!message.read){
		return(
			<Link className="message-link" to={`/messages/${message.id}`}>
				<div className="message-item-wrapper">
					<div className="row">
						<IoMailUnread className="icon-unread"/>
						<h3 className="message-read">{message.subject}</h3>
					</div>
					<p>{date.toLocaleDateString()}</p>
				</div>
			</Link>
		)
	} else {
		return (
			<Link className="message-link" to={`/messages/${message.id}`}>
				<div className="message-item-wrapper">
					<div className="row ">
						<IoMailOpen className="icon-read" size="1.2rem"/>
						<h3>{message.subject}</h3>
					</div>
					<p>{date.toLocaleDateString()}</p>
				</div>
			</Link>
		)
	}
	
}

export default MessageItem