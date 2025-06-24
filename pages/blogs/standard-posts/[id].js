import Layout from '../../../components/Layout';
import { useEffect } from 'react';
import Comments from '../../../components/commons/Comment';
import { API_URL } from '../../../config';

export async function getServerSideProps(context) {
    const { id } = context.params;    // Fetch posts data from API or DB
    const data = await fetch(`${API_URL}/api/posts/${id}`).then(res => res.json());

    return {
        props: { post: data },
    };
}

export default function SingleStandardPost({ post }) {
    useEffect(() => {

    }, []);

    return (
        <Layout>
            <section id="content-wrap" className="blog-single">
                <div className="row">
                    <div className="col-twelve">
                        <article className="format-standard">
                            <div className="content-media">
                                <div className="post-thumb">
                                    <img src={post.image} alt={post.name} />
                                </div>
                            </div>
                            <div className="primary-content">
                                <h1 className="page-title">{post.name}</h1>
                                <ul className="entry-meta">
                                    <li className="date">Published on: {post.publishedDate}</li>
                                    <br />
                                    <li className="cat">Category: <a href={`/categories/${post.categorySlug}`}>{post.categoryName}</a></li>
                                </ul>
                                <p className="lead">{post.description}</p>
                            </div>
                        </article>
                    </div>
                </div>
                <Comments postId={post.id} />
            </section>
        </Layout>
    );
}
