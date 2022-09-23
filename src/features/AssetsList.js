import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAssets } from './assetsSlice';
import AssetsExcerpt from './AssetsExcerpt';
import Pagination from './Pagination';

const AsssetsList = () => {
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const assets = useSelector((state) => state.assets);
	const pages = Math.ceil(assets.count/assets.pagesize);
	const page_start = (page-1)*assets.pagesize;
	const page_end = page*assets.pagesize;

	useEffect(
		() => { 
			if(['loading', 'success'].indexOf(assets.status[page]) === -1) {
				dispatch(getAssets(page));
			}
		}, 
		[dispatch, page]
	);

	const page_assets = useMemo(
		() => assets.list.slice(page_start, page_end), 
		[page, assets]
	);
	
	return (
		<div>
			{page_assets.map((a, idx) => <AssetsExcerpt key={a ? a.id : -idx} asset={a} />)}
			<Pagination pages={pages} current={page} onClick={(p)=>setPage(p)}/>
		</div>
	)
}

export default AsssetsList

