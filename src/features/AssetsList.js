import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAssets } from '../app/assetsSlice';
import { getCategories } from '../app/categoriesSlice';
import AssetsItem from './AssetsItem';
import Pagination from './Pagination';
import AssetsFilter from './AssetsFilter'

const AssetsList = () => {
	const [filter, setFilter] = useState({
		page: 1,
		q: '',
		type_id: null,
		topic_id: null,
		learning_path_id: null,
		target_audience_id: null,
		industry_setting_id: null,
		language_id: null,
	});

	const dispatch = useDispatch();
	const assets = useSelector((state) => state.assets);
	const categories = useSelector((state) => state.categories);
	const pages = Math.ceil(assets.count/assets.pagesize);
	const page_start = (filter.page-1)*assets.pagesize;
	const page_end = filter.page*assets.pagesize;

	useEffect(
		() => { 
			if(['loading', 'success'].indexOf(assets.status[filter.page]) === -1) {
				dispatch(getAssets(filter));
			}
		}, 
		[dispatch, filter]
	);

	useEffect(
		() => {dispatch(getCategories())},
		[dispatch]
	);

	const page_assets = useMemo(
		() => assets.list.slice(page_start, page_end),
		[filter, assets]
	);

	const changeFilter = (id, val) => {
		setFilter({...filter, [id]: val});
	}

	return (
		<div>
			<AssetsFilter label='Type' options={categories.type.all} selected={filter.type_id} onChange={e => {changeFilter('type_id', e)}}/>
			<AssetsFilter label='Topic' options={categories.topic.all} selected={filter.topic_id} onChange={e => {changeFilter('topic_id', e)}}/>
			<AssetsFilter label='Path' options={categories.learning_path.all} selected={filter.learning_path_id} onChange={e => {changeFilter('learning_path_id', e)}}/>
			{page_assets.map((a, idx) => <AssetsItem key={a ? a.id : -idx} asset={a} />)}
			<Pagination pages={pages} current={filter.page} onClick={p=> {changeFilter('page', p)} }/>
		</div>
	)
}

export default AssetsList

