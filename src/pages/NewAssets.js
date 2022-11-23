import { useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNew } from "../app/newassetsSlice";
import { getCategories } from '../app/categoriesSlice';
import debounce from '../features/debounce';
import AssetsItem from "../features/AssetsItem";
import Pagination from '../features/Pagination';
import AssetsFilter from '../features/AssetsFilter';
import { NavLink } from "react-router-dom";
import "./NewAssets.css";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

const NewAssets = () => {
	const dispatch = useDispatch();
	const new_assets = useSelector((state) => state.newassets);
	const categories = useSelector((state) => state.categories);
	const filter = new_assets.filter;
	const pages = Math.ceil(new_assets.count / new_assets.pagesize);
	const page_start = (filter.page-1) * new_assets.pagesize;
	const page_end = filter.page * new_assets.pagesize;
	const activeClassName = "activeBtn";

	useEffect(() => {
		if(["loading", "success"].indexOf(new_assets.status[filter.page]) === -1) {
			dispatch(getNew(filter))
		}
	}, [dispatch, filter, new_assets.status]);

	useEffect(
		() => { dispatch(getCategories())},
		[dispatch]
	);
	
	const page_assets = useMemo(
		() => new_assets.index.slice(page_start, page_end).map(id => (new_assets.map[id])),
		[new_assets, page_start, page_end]
	)
	const changeFilter = (id, val) => {
		dispatch(getNew({...filter, [id]:val, page: 1}));
	}
	const debouncedSearch = useCallback(debounce(changeFilter), [changeFilter]);

	const changePage = (page) => {
		dispatch(getNew({ ...filter, page }));
	}

	return (
		<div className="container">
					<div className="row">
			<div className='container-md list-filter-wrapper'>
				<div className='row align-items-center pb-3 list-filter'>
					<div className='col-12 pb-3'>
						<label className='search-label'>Search <input defaultValue={filter.q} onChange={(e) => { debouncedSearch('q', e.target.value) }} /></label>
					</div>
					<div className='col'>
						<AssetsFilter label='Learning Paths' options={categories.learning_path.all} empty={"- ALL " + categories.learning_path.plural + " -"} selected={filter.learning_path_id} onChange={v => { changeFilter('learning_path_id', v) }} />
						<AssetsFilter label='Types' options={categories.type.all} empty={"- ALL " + categories.type.plural + " -"} selected={filter.type_id} onChange={v => { changeFilter('type_id', v) }} />
					</div>
					
					<div className='col'>
						<AssetsFilter label='Topics' options={categories.topic.all} empty={"- ALL " + categories.topic.plural + " -"} selected={filter.topic_id} onChange={v => { changeFilter('topic_id', v) }} />
						<AssetsFilter label='Suggested Industry Usage' options={categories.industry_setting.all} empty={"- ALL " + categories.industry_setting.plural + " -"} selected={filter.industry_setting_id} onChange={v => { changeFilter('industry_setting_id', v) }} />
					</div>
					
					<div className='col'>
						<AssetsFilter label='Target Audiences' options={categories.target_audience.all} empty={"- ALL " + categories.target_audience.plural + " -"} selected={filter.target_audience_id} onChange={v => { changeFilter('target_audience_id', v) }} />
						<AssetsFilter label='Languages' options={categories.language.all} empty={"- ALL " + categories.language.plural + " -"} selected={filter.language_id} onChange={v => { changeFilter('language_id', v) }} />
					</div>
				</div>
			</div>

			<div className="row buttons-wrapper">				
					<NavLink to="/" className="assets-button">Assets</NavLink>
					<NavLink to="/whats-new" className={({isActive}) => isActive ? activeClassName + " assets-button" : "assets-button"}>New</NavLink>				
			</div>

			<div className='page-content col-12'>
				<div>
					<Pagination pages={pages} current={filter.page} onClick={p => { changePage(p) }} />			
					<div className='assets-list'>
						{page_assets.map((a, idx) => <AssetsItem key={a ? a.id : -idx} asset={a} />)}
					</div>
				</div>
			</div>
		</div>
		</div>
	)
}

export default NewAssets