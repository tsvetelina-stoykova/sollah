import { useDispatch, useSelector } from "react-redux";
import { listMessages } from "../app/messagesSlice";
import { useEffect } from "react";

const Messages = () => {
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.messages);
	useEffect(() => { dispatch(listMessages()) }, [dispatch]);

	return (
		<div className="row">
			<div className="col-12">
				<h3 className="pb-3">Messages</h3>
				{messages.allMessages.map( (msg) => <p key={msg.id}>{msg.subject}</p> )}
			</div>
		</div>
	  )
}

export default Messages