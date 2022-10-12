import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation} from "react-router-dom"
import { login } from "../app/authSlice";

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

	const emailHandler = (e) => {
		setEmail(e.target.value);
	}
	const passwordHandler = (e) => {
		setPassword(e.target.value);
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login({email, password}));
	}

	return (
		<div className="col-md-6 offset-md-3 mt-5">
			<h4 className="pb-3">Login</h4>
			<form onSubmit={handleSubmit}>
				<div className="pb-2">
					<label className="pr-3">email </label>
					<input name="email" type="text" value={email} onChange={emailHandler}/>
				</div>
				<div className="pb-3">
					<label className="pr-4">Password </label>
					<input name="password" type="password" value={password} onChange={passwordHandler}/>
				</div>
				<button disabled={auth.pending}>Login</button>
			</form>
		</div>
	)
}

export default Login