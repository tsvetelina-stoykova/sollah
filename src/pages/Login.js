import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation} from "react-router-dom"
import { login } from "../app/authSlice";
import { Form, Button, Stack, Row, Col } from "react-bootstrap"
import "./Login.css";

const Login = () =>  {
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const from = location.state?.from?.pathname || "/";

	useEffect(() => {
		if (auth.user) navigate(from, {reset: true})
	}, [auth.user]);

	const handleEmail = (e) => {
		setEmail(e.target.value);
	}
	const handlePassword = (e) => {
		setPassword(e.target.value);
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login({email, password}));
	}


	return(
		<div>
			<Stack className="col-lg-5 mx-auto" gap={3}>
				<h1>Sign In</h1>
				<div className="form-wrapper">
					<Form onSubmit={handleSubmit}>
	 					<Form.Group as={Row} className="mb-3" controlId="formEmail">
	 						<Form.Label column sm={4}>Email address</Form.Label>
	 						<Col>
	 							<Form.Control sm={8} type="email" name="email" value={email} onChange={handleEmail}/>
	 						</Col>
						</Form.Group>

	 					<Form.Group as={Row} className="mb-3" controlId="formPassword">
	 						<Form.Label column sm={4}>Password</Form.Label>
	 						<Col>
	 							<Form.Control sm={8} type="password" name="password" value={password} onChange={handlePassword}></Form.Control>
	 						</Col>
	 					</Form.Group>
	 					<Form.Group as={Row}>
	 						<Form.Label column sm={4}></Form.Label>
	 						<Col>
	 							<Button sm={8}  className="form-button" type="submit" disabled={auth.pending}>Log In</Button>
	 						</Col>	
	 					</Form.Group>
	 				</Form>
				</div>
			</Stack>
		</div>
	)
}

export default Login