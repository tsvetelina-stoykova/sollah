import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../app/profileSlice";
import { useEffect } from "react";
import { Container, Row, Col, Card, Stack } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile.profile);
	useEffect(() => {dispatch(getProfile())}, [dispatch])
	const user_name = profile.first_name + " " + profile.last_name
	return (
		<div className="container">
				<div className="row s pb-4 align-self-center profile-container">				
					<h2 className="col-12 user-name">{user_name}, <span>{profile.company_position}</span></h2>
					<div className="col-6 user-personal-info">
						<p>Email: {profile.email}</p> 
						<p>Last Login: {profile.last_login}</p>
					</div>
					<div className="col-6 ">
						<h2>{profile.company}</h2>	
						<span>Phone: {profile.company_phone}</span>
						<span>Address: {profile.company_address}</span>
					</div>				
				</div>
		</div>
	)

}

export default Profile