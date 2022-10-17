import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOne } from "../app/blogsSlice";

function BlogDetails() {
	const { seo_id } = useParams();
	const dispatch = useDispatch();
	const post = useSelector((state) => state.blogs.map[seo_id]);
	useEffect(() => {
		if(!post) dispatch(getOne({seo_id}));
	}, [dispatch]);
	
	return (
		<div>{ post ?
			(<h2>{post.title}</h2>)
			:
			(<span>Not found</span>)
		}
		</div>
	)
}

export default BlogDetails