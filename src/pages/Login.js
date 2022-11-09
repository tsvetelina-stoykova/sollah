import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation} from "react-router-dom"
import { login } from "../app/authSlice";
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

	return (
		<div className="container">
			<div className="row justify-content-center ">
				<div className="col-4 py-3 login-wrapper">
					<form onSubmit={handleSubmit} className="row pt-2 login-form">
						<div className="col">
							<div className="pb-3">
								<label className="pr-4 mr-4">Email </label>
								<input name="email" type="text" value={email} onChange={handleEmail}/>
							</div>
							<div className="pb-3">
								<label className="pr-1 mr-3">Password </label>
								<input name="password" type="password" value={password} onChange={handlePassword}/>
							</div>
							<div className="col-7 offset-3 mr-2 ">
								<button className="form-button " disabled={auth.pending}>Log In</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login