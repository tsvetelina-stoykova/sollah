import { useParams } from "react-router-dom";

const VideoPlayer = () => {
	const {id} = useParams();
	console.log("ID:", id);
	return (
		<>
			<div>VideoPlayer</div>
			<video width="320" height="240" controls>
				<source src={`/play/${id}`} type="video/mp4" />
				<source src="#" type="video/ogg" />
				Your browser does not support the video tag.
			</video> 
		</>
)
}

export default VideoPlayer
