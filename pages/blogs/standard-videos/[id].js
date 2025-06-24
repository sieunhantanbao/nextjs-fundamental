import Layout from '../../../components/Layout';
import Comments from '../../../components/commons/Comment';
import { useEffect } from 'react';
import { API_URL } from '../../../config';


export async function getServerSideProps(context) {
    const { id } = context.params;    
    const data = await fetch(`${API_URL}/api/posts/${id}`).then(res => res.json());

    return {
        props: { post: data },
    };
}

export default function VideoPost({ post }) {
    useEffect(() => {
        const loadFitVids = async () => {
            if (typeof window !== 'undefined') {
                const $ = (await import('jquery')).default;
                if (!$.fn.fitVids) {
                    const fitVids = (await import('fitvids')).default;
                    $.fn.fitVids = function () {
                        return this.each(function () {
                            fitVids(this);
                        });
                    };
                }
                $('.fluid-video-wrapper').fitVids();
            }
        };
        loadFitVids();
    }, []);

    return (
        <Layout>
            <section id="content-wrap" className="blog-single">
                <div className="row">
                    <div className="col-twelve">

                        <article className="format-video">

                            <div className="content-media">
                                <div className="fluid-video-wrapper">
                                    <iframe
                                        src={post.video}
                                        width="900"
                                        height="550"
                                        frameBorder="0"
                                        allow="autoplay; fullscreen"
                                        allowFullScreen
                                        title="Vimeo Video"
                                    ></iframe>
                                </div>
                            </div>

                            <div className="primary-content">
                                <h1 className="entry-title">{post.name}</h1>

                                <ul className="entry-meta">
                                    <li className="date">Published on: {post.publishedDate}</li> <br />
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
