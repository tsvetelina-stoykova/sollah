import "./AssetsFilter.css"

const AssetsFilter = ({label, empty, options, selected, onChange}) => {
	const onChangeHandler = (e) => {
		onChange(e.target.value)
	}

	return (
		<div className='row pb-3'>
			<div className='col-4 col-lg-12 filter-label'>{label}</div>
			<div className='col-4 col-lg-12 filter-option'>
				<select className="filter-select" value={selected} onChange={onChangeHandler}>
					<option>{empty}</option>
					{options.map(o => <option key={o.id} value={o.id}>{o.name} {o.cnt ? `(${o.cnt})` : ''}</option>)}
				</select>
			</div>
		</div>
	)
}

export default AssetsFilter