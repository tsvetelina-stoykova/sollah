import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOne } from "../app/blogsSlice";
import "./BlogDetails.css"

function BlogDetails() {
	const { seo_id } = useParams();
	const dispatch = useDispatch();
	const post = useSelector((state) => state.blogs.map[seo_id]);

	useEffect(() => {
		if(!post) dispatch(getOne({seo_id}));
	}, [dispatch, post, seo_id]);

	const date = new Date(post.scheduled * 1000);
	const parser = new DOMParser();
	const bodyHTML = parser.parseFromString(post.body, "text/html");
	const body = bodyHTML.documentElement.textContent;

	// TODO: Related Assets

	// TODO: Fix error on reload

	return (
		<>{ post ?
			(
			<div className="container">
				<div className="row page-content justify-content-center">
					<div className="post-wrapper">
						<div className="col-8 post-heading mb-3">
							<h2 className="pb-1">{post.title}</h2>
							<span className="post-date pb-1">{date.toLocaleDateString()}</span>
						</div>
						<div className="col-8 mb-3">
							<img className="post-image" src={post.thumb_url}  alt="Post"/>
						</div>
						<div className="col-8 mb-3">
							{body}
						</div>
						</div>
					<div className="col related-assets justify-content-start">
						<h3>Related Assets</h3>
					</div>
				</div>
			</div>
			)
			:
			(<span>Not found</span>)
		}
		</>
	)
}

export default BlogDetails