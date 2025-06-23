import React, { useEffect } from 'react';
export default function GalleryPost({ post }) {
    useEffect(() => {
        // Dynamically load jQuery, MediaElementPlayer only on the client
        const loadPlugins = async () => {
            if (typeof window !== 'undefined') {
                // Dynamically import jQuery and assign to window if not present
                if (!window.jQuery) {
                    const jq = (await import('jquery')).default;
                    window.$ = window.jQuery = jq;
                }
                // flexslider
                if (window.jQuery && (!window.jQuery.fn || !window.jQuery.fn.flexslider)) {
                    await import('flexslider');
                }
                // Only try to call masonry if it is loaded
                const hasMasonry = window.jQuery && window.jQuery.fn && window.jQuery.fn.masonry;
                // Now initialize the plugins
                if (window.jQuery && typeof window.jQuery === 'function') {
                    window.jQuery(function ($) {
                        $('.post-slider').flexslider({
                            namespace: 'flex-',
                            controlsContainer: '',
                            animation: 'fade',
                            controlNav: true,
                            directionNav: false,
                            smoothHeight: false,
                            slideshowSpeed: 7000,
                            animationSpeed: 600,
                            randomize: false,
                            touch: true,
                            start: function (slider) {
                                if (typeof slider.container === 'object') {
                                    slider.container.on('click', function (e) {
                                        if (!slider.animating) {
                                            slider.flexAnimate(slider.getTarget('next'));
                                        }
                                    });
                                }
                                // Only call masonry if it is loaded
                                if (hasMasonry) {
                                   // $(this).parents('.bricks-wrapper').masonry('layout');
                                }
                            },
                        });
                    });
                }
            }
        };
        loadPlugins();
    }, []);
    return (
        <article className="brick entry format-gallery group">
            <div className="entry-thumb">
                <div className="post-slider flexslider">
                    <ul className="slides">
                        {post.gallery.map((gallery, index) => (
                            <li key={index}>
                                <img src={gallery} alt={post.name} />
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <div className="entry-text">
                <div className="entry-header">

                    <div className="entry-meta">
                        <span className="cat-links">
                            <a href={`/categories/${post.categorySlug}`}>{post.categoryName}</a>
                        </span>
                    </div>

                    <h1 className="entry-title"><a href={`/blogs/standard-galleries/${post.id}`}>{post.name}</a></h1>

                </div>
                <div className="entry-excerpt">
                    {post.description}
                </div>
            </div>

        </article>
    )
}