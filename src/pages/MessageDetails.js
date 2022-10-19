import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listMessages } from "../app/messagesSlice";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io"
import "./MessageDetails.css"

const MessageDetails = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.messages.allMessages);
	const message = messages.find(msg => msg.id===id);
	const date = new Date(message.timestamp * 1000);
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	  };
	const parser = new DOMParser();
	const bodyHTML = parser.parseFromString(message.message, "text/html");
	const body = bodyHTML.documentElement.textContent;
	
	useEffect(() => {
		dispatch(listMessages())
	}, [dispatch]) 


	// TODO: Icon envelope read/unread
	
	return (
		<div>
			<div className="container">
				<div className="col-9 back-btn-wrapper">
					<Link to="/messages" className="col-1 button back-btn"><IoMdArrowRoundBack className="mx-auto" size="1.5rem"/></Link>
				</div>
			
				<div className="col-9 pb-4 my-3 align-self-center message-container">
					<div className="message-item-wrapper">
						<div className="row justify-content-between">
							<div className="col-9">
								<h2 className="message-subject">{message.subject}</h2>
								<span className="pt-4 message-from">from: {message.from}</span>
							</div>
							<div>
								<span className="col-3 message-date">{date.toLocaleDateString('en-US', options)}</span>
							</div>
						</div>
						<div className="py-4 message-body ">
							{body}
						</div>
					</div>
				</div>		
			</div>
		</div>
	)
}

export default MessageDetails