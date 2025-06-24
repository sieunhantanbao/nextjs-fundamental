import React, { useEffect } from 'react';
import Link from 'next/link';

export default function FeaturedPost({ posts = [] }) {
    useEffect(() => {
        // Dynamically load jQuery and flexslider
        const loadPlugins = async () => {
            if (typeof window !== 'undefined') {
                // Dynamically import jQuery and assign to window if not present
                if (!window.jQuery) {
                    const jq = (await import('jquery')).default;
                    window.$ = window.jQuery = jq;
                }
                
                // Load flexslider if needed
                if (window.jQuery && (!window.jQuery.fn || !window.jQuery.fn.flexslider)) {
                    await import('flexslider');
                }
                
                // Initialize flexslider
                if (window.jQuery && typeof window.jQuery === 'function') {
                    window.jQuery(function ($) {
                        $('#featured-post-slider').flexslider({
                            namespace: "flex-",
                            controlsContainer: "", // ".flex-content",
                            animation: 'fade',
                            controlNav: false,
                            directionNav: true,
                            smoothHeight: false,
                            slideshowSpeed: 7000,
                            animationSpeed: 600,
                            randomize: false,
                            touch: true,
                        });
                    });
                }
            }
        };
        
        loadPlugins();
    }, []);

    return (
        <div className="brick entry featured-grid animate-this">
            <div className="entry-content">
                <div id="featured-post-slider" className="flexslider">
                    <ul className="slides">
                        {posts.map((post, index) => (
                            <li key={post.id || index}>
                                <div className="featured-post-slide">
                                    <div className="post-background" style={{backgroundImage: `url('${post.image}')`}}></div>
                                    
                                    <div className="overlay"></div>
                                    
                                    <div className="post-content">
                                        <ul className="entry-meta">
                                            <li>{post.publishedDate}</li>
                                            <li>
                                                <Link href={`/categories/${post.categorySlug}`} legacyBehavior>
                                                    <a>{post.categoryName}</a>
                                                </Link>
                                            </li>
                                        </ul>
                                        
                                        <h1 className="slide-title">
                                            <Link href={`/blogs/standard-posts/${post.id}`} legacyBehavior>
                                                <a title={post.name}>{post.name}</a>
                                            </Link>
                                        </h1>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}