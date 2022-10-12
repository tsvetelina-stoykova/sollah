import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../app/authSlice";

const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logout()).then(() => {
			navigate("/", { replace: true });
		  });
	
	  }, [dispatch,navigate]);
}

export default Logout