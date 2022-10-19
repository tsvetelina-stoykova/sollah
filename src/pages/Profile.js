import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../app/profileSlice";
import { useEffect } from "react";

const Profile = () => {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile.profile);
	console.log(profile);
	useEffect(() => {dispatch(getProfile())}, [dispatch])

	return (
		<div>{profile.email}</div>
	)
}

export default Profile