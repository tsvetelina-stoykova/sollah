import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";

const AuthStatus = () => {
	const auth = useSelector(state => state.auth);
	const navigate = useNavigate();
	
	const logout = () => {
		localStorage.removeItem('user');
		return navigate("/");
	}
	
	if (!auth.user){
		return (<button className='button displaySmNone displayMdInlineFlex'>
					<Link to='/login' >Log in</Link>
				</button>)
	} else {
		return(	<>
				<p>Welcome!</p>
				<button onClick={ logout }>Log out</button>
				</>)
	}

}

export default AuthStatus