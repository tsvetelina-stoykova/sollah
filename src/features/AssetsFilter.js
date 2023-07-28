import "./AssetsFilter.css"
import { Form } from "react-bootstrap"

const AssetsFilter = ({label, empty, options, selected, onChange}) => {
	const onChangeHandler = (e) => {
		onChange(e.target.value)
	}

	return(
		<Form.Group className="mb-3" controlId="formFilter">
		<Form.Label className="filter-label">{label}</Form.Label>
		<Form.Select value={selected} onChange={onChangeHandler}>
			<option>{empty}</option>
			{options.map(o => 
						<option key={o.id} value={o.id}>
						{o.name} {o.cnt ? `(${o.cnt})` : ''}
					</option>)}
		</Form.Select>
	</Form.Group>
	)
}

export default AssetsFilter