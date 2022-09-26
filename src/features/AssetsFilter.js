import React from 'react'
import classes from './AssetsFilter.module.css'

const AssetsFilter = ({label, options, onChange}) => {
  return (
	<div className={classes.assetsFilterWrap}>
		<div className={classes.assetsFilterDropdown}>
			<label htmlFor='assets'>{label}</label>
			<select name='assets' value='' onChange={onChange}>
				<option key='' value=''>- All -</option>
				{options.map(o => {<option key={o.id} value={o.id}>{o.name} {o.cnt ? `(${o.cnt})` : ''}</option>})}
			</select>
		</div>
	</div>
  )
}

export default AssetsFilter