import React, { useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAssets } from '../app/assetsSlice';
import { getCategories } from '../app/categoriesSlice';
import debounce from '../features/debounce';
import AssetsItem from '../features/AssetsItem';
import Pagination from '../features/Pagination';
import AssetsFilter from '../features/AssetsFilter';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import './AssetsList.css'

// TODO: Thumbnail tags; Liked icon

const AssetsList = () => {
	const dispatch = useDispatch();
	const assets = useSelector((state) => state.assets);
	const categories = useSelector((state) => state.categories);
	const filter = assets.filter;
	const pages = Math.ceil(assets.count / assets.pagesize);
	const page_start = (filter.page - 1) * assets.pagesize;
	const page_end = filter.page * assets.pagesize;
	const activeClassName = "btn-active";
	
	useEffect(
		() => {
			if (['loading', 'success'].indexOf(assets.status[filter.page]) === -1) {
				dispatch(getAssets(filter));
			}
		},
		[dispatch, filter, assets.status]
	);

	useEffect(() => { dispatch(getCategories()) }, [dispatch]);

	const page_assets = useMemo(
		() => assets.index.slice(page_start, page_end).map(id=>(assets.map[id])), 
		[ assets, page_start, page_end]);
	const changeFilter = (id, val) => {
		dispatch(getAssets({ ...filter, [id]: val, page: 1 }));
	}

	const debouncedSearch = useCallback(debounce(changeFilter), [changeFilter]);

	const changePage = (page) => {
		dispatch(getAssets({ ...filter, page }));
	}

	return (
		<Container>
			<Stack direction="horizontal" gap={3} className="justify-content-center my-3 py-4">
				<NavLink to="/" className={({isActive}) => isActive ? activeClassName + " assets-toggle" : "assets-toggle"}>
					Assets</NavLink> /
				<NavLink to="/whats-new"  className="assets-toggle">New</NavLink>
			</Stack>

			<Row>
				<Col sm={9}>
					<Pagination pages={pages} current={filter.page} onClick={p => { changePage(p) }} />
						{page_assets.map((a, idx) => <AssetsItem key={a ? a.id : -idx} asset={a} />)}					
					<Pagination pages={pages} current={filter.page} onClick={p => { changePage(p) }} />
				</Col>
				<Col sm={3}>
					
						<label>Search <input defaultValue={filter.q} onChange={(e) => { debouncedSearch('q', e.target.value) }} /></label>
						
					<div><AssetsFilter label='Learning Paths' options={categories.learning_path.all} empty={"- ALL " + categories.learning_path.plural + " -"} selected={filter.learning_path_id} onChange={v => { changeFilter('learning_path_id', v) }} /></div>
					<div><AssetsFilter label='Types' options={categories.type.all} empty={"- ALL " + categories.type.plural + " -"} selected={filter.type_id} onChange={v => { changeFilter('type_id', v) }} /></div>
					<div><AssetsFilter label='Topics' options={categories.topic.all} empty={"- ALL " + categories.topic.plural + " -"} selected={filter.topic_id} onChange={v => { changeFilter('topic_id', v) }} /></div>
					<div><AssetsFilter label='Suggested Industry Usage' options={categories.industry_setting.all} empty={"- ALL " + categories.industry_setting.plural + " -"} selected={filter.industry_setting_id} onChange={v => { changeFilter('industry_setting_id', v) }} /></div>
					<div><AssetsFilter label='Target Audiences' options={categories.target_audience.all} empty={"- ALL " + categories.target_audience.plural + " -"} selected={filter.target_audience_id} onChange={v => { changeFilter('target_audience_id', v) }} /></div>
					<div><AssetsFilter label='Languages' options={categories.language.all} empty={"- ALL " + categories.language.plural + " -"} selected={filter.language_id} onChange={v => { changeFilter('language_id', v) }} /></div>
				</Col>
			</Row>

		</Container>
	)
}

export default AssetsList

