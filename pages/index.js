import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import renderPostByType from '../components/commons/renderPostType';
export default function Home() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/posts/list`);
        if (!res.ok) throw new Error('Failed to load Posts');

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();

    // Dynamically load jQuery, FlexSlider, and MediaElementPlayer only on the client
    const loadPlugins = async () => {

      if (typeof window !== 'undefined') {
        // Dynamically import jQuery and assign to window if not present
        if (!window.jQuery) {
          const jq = (await import('jquery')).default;
          window.$ = window.jQuery = jq;
        }
        const hasMasonry = window.jQuery && window.jQuery.fn && window.jQuery.fn.masonry;
        // Now initialize the plugins
        if (window.jQuery && typeof window.jQuery === 'function') {
          window.jQuery(function ($) {
            if (hasMasonry) {
              // $('.bricks-wrapper').masonry('layout');
            }
          });
        }
      }
    };
    loadPlugins();

  }, []);

  if (loading) return <p>Loading Posts...</p>;
  if (error) return <p>Error: {error}</p>;
  if (posts.length === 0) return <p>No Posts found.</p>;

  return (
    <Layout>
      <section id="bricks">

        <div className="row masonry">

          <div className="bricks-wrapper">

            <div className="grid-sizer"></div>

            {posts.map(post => (
              <React.Fragment key={post.id}>
                {renderPostByType(post)}
              </React.Fragment>
            ))}

          </div>
        </div>
        <div class="row">

          <nav class="pagination">
            <span class="page-numbers prev inactive">Prev</span>
            <span class="page-numbers current">1</span>
            <a href="#" class="page-numbers">2</a>
            <a href="#" class="page-numbers">3</a>
            <a href="#" class="page-numbers">4</a>
            <a href="#" class="page-numbers">5</a>
            <a href="#" class="page-numbers">6</a>
            <a href="#" class="page-numbers">7</a>
            <a href="#" class="page-numbers">8</a>
            <a href="#" class="page-numbers">9</a>
            <a href="#" class="page-numbers next">Next</a>
          </nav>

        </div>
      </section>
    </Layout>
  );
}
