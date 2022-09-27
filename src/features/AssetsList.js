import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAssets } from '../app/assetsSlice';
import { getCategories } from '../app/categoriesSlice';
import debounce from './debounce';
import AssetsItem from './AssetsItem';
import Pagination from './Pagination';
import AssetsFilter from './AssetsFilter'

const AssetsList = () => {
	const [filter, setFilter] = useState({
		page: 1,
		q: '',
		type_id: '',
		topic_id: '',
		learning_path_id: '',
		target_audience_id: '',
		industry_setting_id: '',
		language_id: '',
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

	useEffect(() => {dispatch(getCategories())}, [dispatch]);

	const page_assets = useMemo(() => assets.list.slice(page_start, page_end), [filter, assets]);

	const changeFilter = (id, val) => {
		dispatch({type:'assets/reset'});
		setFilter({...filter, [id]: val, page: 1});
	}

	const debouncedSearch = useCallback(debounce(changeFilter), [filter]);

	const changePage = (page) => {
		setFilter({...filter, page});
	}

	return (
		<div>
			<div><label>Search <input defaultValue={filter.q} onChange={(e) => {debouncedSearch('q', e.target.value)}}/></label></div>
			<AssetsFilter label='Type' options={categories.type.all} empty={"- ALL "+categories.type.plural+" -"} selected={filter.type_id} onChange={v => {changeFilter('type_id', v)}}/>
			<AssetsFilter label='Topic' options={categories.topic.all} selected={filter.topic_id} onChange={v => {changeFilter('topic_id', v)}}/>
			<AssetsFilter label='Path' options={categories.learning_path.all} selected={filter.learning_path_id} onChange={v => {changeFilter('learning_path_id', v)}}/>
			{page_assets.map((a, idx) => <AssetsItem key={a ? a.id : -idx} asset={a} />)}
			<Pagination pages={pages} current={filter.page} onClick={p=> {changePage(p)} }/>
		</div>
	)
}

export default AssetsList

