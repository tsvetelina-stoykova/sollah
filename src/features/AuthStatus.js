import { useSelector } from "react-redux";
import { Stack } from "react-bootstrap";
import "./AuthStatus.css";

const AuthStatus = () => {
	const auth = useSelector(state => state.auth);
	
	if (!auth.user){
		return (<a className="account-cta" href="/login">Log In</a>)
	} else {
		return(	<Stack direction="horizontal">	
					<span className="account-name">Welcome, {auth.user.first_name}! </span>
					<a className="account-cta" href="/logout">Log Out</a>
				</Stack>	)
	}

}

export default AuthStatus