import { useEffect } from 'react';
export default function AudioPost({ post }) {
    useEffect(() => {
        // Dynamically load jQuery, MediaElementPlayer only on the client
        const loadPlugins = async () => {
            if (typeof window !== 'undefined') {
                // Dynamically import jQuery and assign to window if not present
                if (!window.jQuery) {
                    const jq = (await import('jquery')).default;
                    window.$ = window.jQuery = jq;
                }
                // MediaElementPlayer
                if (window.jQuery && (!window.jQuery.fn || !window.jQuery.fn.mediaelementplayer)) {
                    await import('mediaelement');
                }
                // Now initialize the plugins
                if (window.jQuery && typeof window.jQuery === 'function') {
                    window.jQuery(function ($) {
                        // MediaElementPlayer
                        $('audio').mediaelementplayer({
                            features: ['playpause', 'progress', 'tracks', 'volume']
                        });
                    });
                }
            }
        };
        loadPlugins();
    }, []);
    return (
        <article className="brick entry format-audio">
            <div className="entry-thumb">
                <a href={`/blogs/standard-audios/${post.id}`} className="thumb-link">
                    <img src={post.thumbnail} alt={post.name} width="100%"/>
                </a>
                <div className="audio-wrap">
                    <audio id={`player-${post.id}`} src={post.audio} width="100%" height="42" controls></audio>
                </div>
            </div>
            <div className="entry-text">
                <div className="entry-header">

                    <div className="entry-meta">
                        <span className="cat-links">
                            <a href={`/categories/${post.categorySlug}`}>{post.categoryName}</a>
                        </span>
                    </div>
                    <h1 className="entry-title"><a href={`/blogs/standard-audios/${post.id}`}>{post.name}</a></h1>
                </div>
                <div className="entry-excerpt">
                    {post.description}
                </div>
            </div>
        </article>
    )
}