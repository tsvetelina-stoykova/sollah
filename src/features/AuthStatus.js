import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./authstatus.css"

const AuthStatus = () => {
	const auth = useSelector(state => state.auth);
	
	if (!auth.user){
		return (<button className='button'>
					<Link className="auth-button" to='/login' >Log In</Link>
				</button>)
	} else {
		return(<>	
					<div>
						<span className="pt-3 pr-1">Welcome, {auth.user.first_name}</span>
						<button className='button'>
							<Link className="auth-button" to='/logout' >Log Out</Link>
						</button>
					</div>
				</>)
	}

}

export default AuthStatus