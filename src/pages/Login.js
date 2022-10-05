import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../app/authSlice";

const Login = () =>  {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const emailHandler = (e) => {
		setEmail(e.target.value);
	}
	const passwordHandler = (e) => {
		console.log(e.target.value);
		setPassword(e.target.value);
	}
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(getAuth({email, password}));
	}

	return (
		<div className="col-md-6 offset-md-3 mt-5">
			<h4 className="pb-3">Login</h4>
			<form onSubmit={submitHandler}>
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