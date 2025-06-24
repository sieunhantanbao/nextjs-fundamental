import Layout from '../../../components/Layout';
import Comments from '../../../components/commons/Comment';
import { useEffect } from 'react';
import { API_URL } from '../../../config';

export async function getServerSideProps(context) {
    const { id } = context.params;    // Fetch posts data from API or DB
    const data = await fetch(`${API_URL}/api/posts/${id}`).then(res => res.json());

    return {
        props: { post: data },
    };
}

export default function AudioPost({ post }) {

    useEffect(() => {
        // Dynamically load jQuery, and MediaElementPlayer only on the client
        const loadPlugins = async () => {
            if (typeof window !== 'undefined') {
                if (!window.jQuery) {
                    await import('jquery');
                }
                // MediaElementPlayer
                if (!window.jQuery.fn.mediaelementplayer) {
                    await import('mediaelement');
                }
                // Now initialize the plugins
                window.jQuery(function ($) {
                    // MediaElementPlayer
                    $('audio').mediaelementplayer({
                        features: ['playpause', 'progress', 'tracks', 'volume']
                    });
                });
            }
        };
        loadPlugins();
    }, []);

    return (
        <Layout>
            <section id="content-wrap" className="blog-single">
                <div className="row">
                    <div className="col-twelve">
                        <article className="format-audio">
                            <div className="content-media">
                                <div className="post-thumb">
                                    <img src={post.image} alt={post.name} />
                                </div>
                                <div className="audio-wrap">
                                    <audio
                                        id="player"
                                        src={post.audio}
                                        width="100%"
                                        height="42"
                                        controls
                                    ></audio>
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
