import { useSelector, useDispatch } from "react-redux";
import { listAll } from "../../app/blogsSlice";
import { useEffect } from "react";
import BlogItem from "../../features/BlogItem";
 
const Blog = () => {
	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs);
	useEffect(() => {
		if(blogs.index.length === 0) dispatch(listAll());
	}, [dispatch, blogs.index.length]);
	
	return (
		<div className="container">
			<div className="row">
				<div className="page-content">
					{blogs.index.map((seo_id) => <BlogItem key={seo_id} post={blogs.map[seo_id]}/>)}
				</div>
			</div>
		</div>
	)
}

export default Blog