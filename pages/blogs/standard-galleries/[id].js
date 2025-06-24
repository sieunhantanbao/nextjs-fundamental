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

export default function GalleryPost({ post }) {
useEffect(() => {
    // Dynamically load jQuery, FlexSlider
    const loadPlugins = async () => {
      if (typeof window !== 'undefined') {
        if (!window.jQuery) {
          await import('jquery');
        }
        // FlexSlider
        if (!window.jQuery.fn.flexslider) {
          await import('flexslider');
        }
        // Now initialize the plugins
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
              $('.bricks-wrapper').masonry('layout');
            },
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
                        <article className="format-gallery">
                            <div className="content-media">
                                <div className="post-slider flexslider">
                                    <ul className="slides">
                                        {post.gallery.map((gallery, index) => (
                                            <li key={index}>
                                                <img src={gallery} alt={`Gallery Image ${index + 1}`} />
                                            </li>
                                        ))}
                                    </ul>
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
