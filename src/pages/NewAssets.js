import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { getNew } from "../app/newassetsSlice";
import AssetsItem from "../features/AssetsItem";
import { useEffect } from "react";
import "./NewAssets.css";

const NewAssets = () => {
	const dispatch = useDispatch();
	const newAssets = useSelector((state) => state.newassets.new);
	const activeClassName = "activeBtn";

	useEffect(() => {
		dispatch(getNew())
	}, [dispatch])
	

	return (
		<div className="container my-3">
			<div className="row new-assets-wrapper">
				<div className="buttons-wrapper">
					<NavLink to="/" className="assets-button">Assets</NavLink>
					<NavLink to="/whats-new" className={({isActive}) => isActive ? activeClassName + " assets-button" : "assets-button"}>New</NavLink>
				</div>
			</div>
			<div className='page-content col-12'>
				<div>				
					<div className='assets-list'>
						{/* {newAssets.map((a, idx) => <AssetsItem key={a ? a.id : -idx} asset={a} />)} */}
					</div>
				</div>
			</div>
			
		</div>
	)
}

export default NewAssets