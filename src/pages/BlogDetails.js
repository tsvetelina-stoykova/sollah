import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOne } from "../app/blogsSlice";
import { getAssetsByIds } from "../app/assetsSlice";
import AssetsItem from '../features/AssetsItem';
import "./BlogDetails.css"

function BlogDetails() {
	const { seo_id } = useParams();
	const dispatch = useDispatch();
	const post = useSelector((state) => state.blogs.map[seo_id]);
	const assets = useSelector((state) => state.assets);
	const blog_missing_ids = post ? post.asset_ids.filter((id)=>!assets.map[id]) : [];

	useEffect(() => {
		if(!post) dispatch(getOne({seo_id}));
	}, [dispatch, post, seo_id]);

	useEffect(() => { 
		if(blog_missing_ids.length) dispatch(getAssetsByIds({ids:blog_missing_ids})); 
	}, [blog_missing_ids]);

	return (
		<>{ post ?
			(
			<div className="container">
				<div className="row page-content justify-content-center">
					<div className="post-wrapper">
						<div className="col-8 post-heading mb-3">
							<h2 className="pb-1">{post.title}</h2>
							{post ? <span className="post-date pb-1">{new Date(post.scheduled * 1000).toLocaleDateString()}</span> : "Loading"}
						</div>
						<div className="col-8 mb-3">
							{post ? <img className="post-image" src={post.thumb_url}  alt="Post"/> : "Loading"}
						</div>
						<div className="col-8 mb-3">							
							{post ? new DOMParser().parseFromString(post.body, "text/html").documentElement.textContent : "Loading"}
						</div>
					</div>
				</div>
				<div className="row related-assets justify-content-start">
						<h3>Related Assets</h3>
						{post.asset_ids.map(id => assets.map[id] ?
							<AssetsItem key={id} asset={assets.map[id]}/> :
							<p key={id}>Asset missing: {id}</p>
						)}
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