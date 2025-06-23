export default function StandardPost({ post }) {
    return (
        <article className="brick entry format-standard">
            <div className="entry-thumb">
                <a href={`/blogs/standard-posts/${post.id}`} className="thumb-link">
                    <img src={post.thumbnail} alt={post.name} />
                </a>
            </div>
            <div className="entry-text">
                <div className="entry-header">
                    <div className="entry-meta">
                        <span className="cat-links">
                            <a href={`/categories/${post.categorySlug}`}>{post.categoryName}</a>
                        </span>
                    </div>
                    <h1 className="entry-title"><a href={`/blogs/standard-posts/${post.id}`}>{post.name}</a></h1>
                </div>
                <div className="entry-excerpt">
                    {post.description}
                </div>
            </div>
        </article>
    )
}