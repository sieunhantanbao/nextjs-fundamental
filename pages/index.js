import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import renderPostByType from '../components/commons/renderPostType';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useMasonryInit from '../hooks/useMasonryInit';

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
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
        const res = await fetch(`http://localhost:3000/api/posts/list?page=${page}&pageSize=${pagination.pageSize}`);
        if (!res.ok) throw new Error('Failed to load Posts');

        const data = await res.json();
        setPosts(data.posts);
        setPagination(data.pagination);
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

  // Function to generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pagination.pageCount, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

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
        
        {pagination.pageCount > 1 && (
          <div className="row">
            <nav className="pagination">              {page > 1 ? (
                <Link href={`/?page=${page - 1}`} legacyBehavior>
                  <a className="page-numbers prev">Prev</a>
                </Link>
              ) : (
                <span className="page-numbers prev inactive">Prev</span>
              )}
              
              {getPageNumbers().map(num => 
                num === page ? (
                  <span key={num} className="page-numbers current" aria-current="page">
                    {num}
                  </span>
                ) : (
                  <Link key={num} href={`/?page=${num}`} legacyBehavior>
                    <a className="page-numbers">{num}</a>
                  </Link>
                )
              )}
              
              {page < pagination.pageCount ? (
                <Link href={`/?page=${page + 1}`} legacyBehavior>
                  <a className="page-numbers next">Next</a>
                </Link>
              ) : (
                <span className="page-numbers next inactive">Next</span>
              )}
            </nav>
          </div>
        )}
      </section>
    </Layout>
  );
}
