import React, { useEffect, useState } from 'react';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.css';

export default function VideoPost({ post }) {
    const [isOpen, setOpen] = useState(false);

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

    // Extract YouTube video ID from post.video (supports both embed and watch URLs)
    const getYouTubeId = url => {
        // Handles both https://www.youtube.com/embed/VIDEOID and https://www.youtube.com/watch?v=VIDEOID
        const embedMatch = url.match(/youtube\.com\/embed\/([\w-]+)/);
        if (embedMatch) return embedMatch[1];
        const watchMatch = url.match(/[?&]v=([\w-]+)/);
        if (watchMatch) return watchMatch[1];
        return '';
    };

    return (
        <article className="brick entry format-video">
            <div className="entry-thumb video-image">
                <button
                    className="thumb-link"
                    style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                    onClick={() => setOpen(true)}
                    aria-label={`Open video: ${post.name}`}
                >
                    <img src={post.thumbnail} alt={post.name}/>
                </button>
                <ModalVideo
                    channel="youtube"
                    isOpen={isOpen}
                    videoId={getYouTubeId(post.video)}
                    onClose={() => setOpen(false)}
                />
            </div>
            <div className="entry-text">
                <div className="entry-header">

                    <div className="entry-meta">
                        <span className="cat-links">
                            <a href={`/categories/${post.categorySlug}`}>{post.categoryName}</a>
                        </span>
                    </div>

                    <h1 className="entry-title"><a href={`/blogs/standard-videos/${post.id}`}>{post.name}</a></h1>

                </div>
                <div className="entry-excerpt">
                    {post.description}
                </div>
            </div>

        </article>
    )
}