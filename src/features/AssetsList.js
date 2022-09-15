import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAssets } from './assetsSlice';
import AssetsExcerpt from './AssetsExcerpt';

const AsssetsList = () => {
	const [page, setPage] = useState(1);

	const dispatch = useDispatch();
	const assets = useSelector((state) => state.assets);

	useEffect( () => {
		dispatch(getAssets(page))
	}, [dispatch] )
	
	let content;
	content = assets.list.map( l => <AssetsExcerpt key={l.id} l={l} />)

	return(
		<div>
			{/* <h3> {content}</h3> */}
			{content}
		</div>
	)
}

export default AsssetsList

