import { useSelector, useDispatch } from "react-redux";
import { listAll } from "../app/blogsSlice";
import { useEffect } from "react";
import BlogItem from "../features/BlogItem";
 
const Blog = () => {
	const dispatch = useDispatch();
	useEffect(() => {dispatch(listAll())}, [dispatch]);
	const blogs = useSelector((state) => state.blogs);
	const posts = blogs.posts;

	return (
		<div className="container">
		<div className="row">
			<div className="page-content">
				{posts.map((post) => <BlogItem key={post.id} post={post}/>)}
			</div>
		</div>
		</div>
	)
}

export default Blog