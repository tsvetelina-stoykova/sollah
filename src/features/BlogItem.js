import "./BlogItem.css";
import { Link } from "react-router-dom";

const BlogItem = ({post}) => {
	const date = new Date(post.scheduled * 1000);
	const options = { year: 'numeric', month: 'short', day: 'numeric' };

	return (
		<section className="row pb-5">
			<div className="col-12 col-lg-3 blog-image-wrapper">
				<Link to={`/blog/${post.seo_id}`}>
					<img className="blog-thumb-image" src={post.thumb_url} width="274px" height="auto" alt="Blog post thumbnail"/>
				</Link>
			</div>
			<div className="col-12 col-lg-9 blog-description-wrapper">
				<div className="pb-4">
					<Link to={`/blog/${post.seo_id}`} className="blog-title">
						<h2 className="blog-title pb-2">{post ? post.title : "Loading.."}</h2>
					</Link>
					<p className="blog-description">{post.description}</p>
				</div>
				<div className="mt-2 blog-date-wrapper">
					<p className="blog-date">{date.toLocaleDateString('en-US', options)}</p>
				</div>
			</div>

		</section>
	)
}

export default BlogItem