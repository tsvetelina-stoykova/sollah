import React, { useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAssets } from '../app/assetsSlice';
import { getCategories } from '../app/categoriesSlice';
import debounce from './debounce';
import AssetsItem from './AssetsItem';
import Pagination from './Pagination';
import AssetsFilter from './AssetsFilter'
import './AssetsList.css'

const AssetsList = () => {
	const dispatch = useDispatch();
	const assets = useSelector((state) => state.assets);
	const categories = useSelector((state) => state.categories);

	const filter = assets.filter;
	const pages = Math.ceil(assets.count / assets.pagesize);
	const page_start = (filter.page - 1) * assets.pagesize;
	const page_end = filter.page * assets.pagesize;

	useEffect(
		() => {
			if (['loading', 'success'].indexOf(assets.status[filter.page]) === -1) {
				dispatch(getAssets(filter));
			}
		},
		[dispatch, filter]
	);

	useEffect(() => { dispatch(getCategories()) }, [dispatch]);

	const page_assets = useMemo(() => assets.list.slice(page_start, page_end), [filter, assets]);

	const changeFilter = (id, val) => {
		dispatch(getAssets({ ...filter, [id]: val, page: 1 }));
	}

	const debouncedSearch = useCallback(debounce(changeFilter), [filter]);

	const changePage = (page) => {
		dispatch(getAssets({ ...filter, page }));
	}

	return (
		<div className='row'>
			<div className='page-content col-12 order-2 col-lg-9 order-lg-1 page-content-menu'>
				<div className='assets-list-wrapper'>
					<div className='assets-list'>
						{page_assets.map((a, idx) => <AssetsItem key={a ? a.id : -idx} asset={a} />)}
					</div>
					<Pagination pages={pages} current={filter.page} onClick={p => { changePage(p) }} />
				</div>
			</div>
			<nav className='col d-none d-lg-block order-1 col-lg-3 order-lg-2'>
				<div className='assets-filter-wrapper'>
					<div><label>Search <input defaultValue={filter.q} onChange={(e) => { debouncedSearch('q', e.target.value) }} /></label></div>
					<AssetsFilter label='Learning Paths' options={categories.learning_path.all} empty={"- ALL " + categories.learning_path.plural + " -"} selected={filter.learning_path_id} onChange={v => { changeFilter('learning_path_id', v) }} />
					<AssetsFilter label='Types' options={categories.type.all} empty={"- ALL " + categories.type.plural + " -"} selected={filter.type_id} onChange={v => { changeFilter('type_id', v) }} />
					<AssetsFilter label='Topics' options={categories.topic.all} empty={"- ALL " + categories.topic.plural + " -"} selected={filter.topic_id} onChange={v => { changeFilter('topic_id', v) }} />
					<AssetsFilter label='Suggested Industry Usage' options={categories.industry_setting.all} empty={"- ALL " + categories.industry_setting.plural + " -"} selected={filter.industry_setting_id} onChange={v => { changeFilter('industry_setting_id', v) }} />
					<AssetsFilter label='Target Audiences' options={categories.target_audience.all} empty={"- ALL " + categories.target_audience.plural + " -"} selected={filter.target_audience_id} onChange={v => { changeFilter('target_audience_id', v) }} />
					<AssetsFilter label='Languages' options={categories.language.all} empty={"- ALL " + categories.language.plural + " -"} selected={filter.language_id} onChange={v => { changeFilter('language_id', v) }} />
				</div>
			</nav>
		</div>
	)
}

export default AssetsList

