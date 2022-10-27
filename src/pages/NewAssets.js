import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { getNew } from "../app/newassetsSlice";
import AssetsItem from "../features/AssetsItem";
import Pagination from '../features/Pagination';
import { useEffect } from "react";
import "./NewAssets.css";

const NewAssets = () => {
	const dispatch = useDispatch();
	const newAssets = useSelector((state) => state.newassets.new);
	const allNewAssets = useSelector((state) => state.newassets);
	const pages = Math.ceil(allNewAssets.count / allNewAssets.pagesize);
	const page_start = (allNewAssets.page - 1) * allNewAssets.pagesize;
	const page_end = (allNewAssets.page) * allNewAssets.pagesize;
	
	const activeClassName = "activeBtn";

	const page_assets = useMemo(() => newAssets.slice(page_start, page_end), [ newAssets, page_start, page_end]);

	const changePage = (page) => {
		dispatch(getNew({ ...allNewAssets, page }));
		console.log("w", page)
	}

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
					<Pagination pages={pages} current={allNewAssets.page} onClick={p => { changePage(p) }}/>
					<div className='assets-list'>
						{page_assets.map((a, idx) => <AssetsItem key={a ? a.id : -idx} asset={a} />)}
					</div>
				</div>
			</div>
			
		</div>
	)
}

export default NewAssets