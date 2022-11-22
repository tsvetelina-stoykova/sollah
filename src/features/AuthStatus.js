import { useSelector } from "react-redux";
import { Button, Stack } from "react-bootstrap"; 

const AuthStatus = () => {
	const auth = useSelector(state => state.auth);
	
	if (!auth.user){
		return (<Button href="login" className='btn-cta'>Log In</Button>)
	} else {
		return(	<Stack direction="horizontal" gap={2}>	
					<span style={{fontWeight: 600}}>Welcome, {auth.user.first_name}! </span>
					<Button className="btn-cta" href="/logout">Log Out</Button>
				</Stack>	)
	}

}

export default AuthStatus