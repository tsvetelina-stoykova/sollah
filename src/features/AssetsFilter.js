import React from 'react'
import classes from './AssetsFilter.module.css'

const AssetsFilter = ({label, empty, options, selected, onChange}) => {
	const onChangeHandler = (e) => {
		onChange(e.target.value)
	}

  return (
	<div className={classes.assetsFilterWrap}>
		<div className={classes.assetsFilterDropdown}>
			<label>{label}{" "}
				<select value={selected} onChange={onChangeHandler}>
					<option key='' value=''>{empty}</option>
					{options.map(o => <option key={o.id} value={o.id}>{o.name} {o.cnt ? `(${o.cnt})` : ''}</option>)}
				</select>
			</label>
		</div>
	</div>
  )
}

export default AssetsFilter