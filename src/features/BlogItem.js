import "./BlogItem.css";

const BlogItem = ({post}) => {
	let date = post.scheduled;
	console.log(Date.parse(date));
	return (
		<section className="row pb-5">
			<div className="col-12 col-lg-4 post-image-wrapper">
				<a href="#">
					<img className="blog-thumb-image" src={post.thumb_url} alt="Blog post thumbnail"/>
				</a>
			</div>
			<div className="col-12 col-lg-8">
				<div className="pb-5">
					<h2 className="blog-title pb-2"><a href="#"><span>{post ? post.title : "Loading.."}</span></a></h2>
					<p className="blog-description">{post.description}</p>
				</div>
				<div className="blog-date-wrapper">
					<p className="blog.date">{Date.toString(post.scheduled)}</p>
				</div>
			</div>

		</section>
	)
}

export default BlogItem