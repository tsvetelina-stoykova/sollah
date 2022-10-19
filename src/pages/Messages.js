import { useDispatch, useSelector } from "react-redux";
import { listMessages } from "../app/messagesSlice";
import { useEffect } from "react";
import MessageItem from "../features/MessageItem";
import "./Messages.css";

const Messages = () => {
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.messages);
	useEffect(() => { dispatch(listMessages()) }, [dispatch]);

	// TODO: Inbox all messages

	return (
		<div className="container">
			<div className="row">
				<div className="col-6 pb-4 align-self-center message-container">
					<h4 className="py-4">Inbox</h4>
					{messages.allMessages.map( (msg) => <MessageItem key={msg.id} message={msg} />)}
				</div>
			</div>
		</div>
	  )
}

export default Messages