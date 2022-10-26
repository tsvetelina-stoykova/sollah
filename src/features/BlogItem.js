import "./BlogItem.css";
import { Link } from "react-router-dom";

const BlogItem = ({post}) => {
	const date = new Date(post.scheduled * 1000);

	return (
		<section className="row pb-5">
			<div className="col-12 col-lg-4 post-image-wrapper">
				<Link to={`/blog/${post.seo_id}`}>
					<img className="blog-thumb-image" src={post.thumb_url} alt="Blog post thumbnail"/>
				</Link>
			</div>
			<div className="col-12 col-lg-8">
				<div className="pb-5">
				<Link to={`/blog/${post.seo_id}`}>
					<h2 className="blog-title pb-2"><span>{post ? post.title : "Loading.."}</span></h2>
				</Link>
					<p className="blog-description">{post.description}</p>
				</div>
				<div className="blog-date-wrapper">
					<p className="blog.date">{date.toLocaleDateString()}</p>
				</div>
			</div>

		</section>
	)
}

export default BlogItem