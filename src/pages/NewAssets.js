import { useSelector, useDispatch } from "react-redux";
import { getNew } from "../app/newassetsSlice";
import { useEffect } from "react";

const NewAssets = () => {
	const dispatch = useDispatch();
	const newAssets = useSelector((state) => state.newassets.new);

	useEffect(() => {
		dispatch(getNew())
	}, [dispatch])
	

	return (
		<div>
			<p>NewAssets</p>
			<span>
				{newAssets.map(asset => asset.title)}
			</span>
		</div>
	)
}

export default NewAssets