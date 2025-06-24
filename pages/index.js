import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import renderPostByType from '../components/commons/renderPostType';
import { useRouter } from 'next/router';
import useMasonryInit from '../hooks/useMasonryInit';
import { API_URL } from '../config';
import Pagination from '../components/commons/Pagination';
import FeaturedPost from '../components/postTypes/FeaturedPost';

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    pageCount: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Get current page from query parameters or default to 1
  const page = parseInt(router.query.page) || 1;
  
  // Fetch posts when page changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Fetch regular posts with pagination
        const res = await fetch(`${API_URL}/api/posts/list?page=${page}&pageSize=${pagination.pageSize}`);
        if (!res.ok) throw new Error('Failed to load Posts');

        const data = await res.json();
        setPosts(data.posts);
        setPagination(data.pagination);
        
        // Fetch featured posts (posts with isFeatured=true)
        const featuredRes = await fetch(`${API_URL}/api/posts/featured`);
        if (featuredRes.ok) {
          const featuredData = await featuredRes.json();
          setFeaturedPosts(featuredData);
        }
      } catch (err) {
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]); // Re-run when page changes
  // Initialize masonry layout when posts change
  useMasonryInit(!loading && posts.length > 0, [posts, page]);

  if (loading) return <p>Loading Posts...</p>;
  if (error) return <p>Error: {error}</p>;
  if (posts.length === 0) return <p>No Posts found.</p>;

  return (
    <Layout>
      <section id="bricks">
        <div className="row masonry">
          <div className="bricks-wrapper">
            <div className="grid-sizer"></div>

            <FeaturedPost posts={featuredPosts} />

            {posts.map(post => (
              <React.Fragment key={post.id}>
                {renderPostByType(post)}
              </React.Fragment>
            ))}
          </div>
        </div>
        {pagination.pageCount > 1 && (
          <Pagination
            currentPage={page}
            pageCount={pagination.pageCount}
            baseUrl="/"
          />
        )}
      </section>
    </Layout>
  );
}
