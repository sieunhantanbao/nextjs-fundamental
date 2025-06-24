import Layout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import renderPostByType from '../../components/commons/renderPostType';
import { useRouter } from 'next/router';
import useMasonryInit from '../../hooks/useMasonryInit';
import { API_URL } from '../../config';
import Pagination from '../../components/commons/Pagination';

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const { page = 1 } = context.query;
    const pageSize = 8;
      // Fetch category data from API
    const category = await fetch(`${API_URL}/api/categories/${slug}`).then(res => res.json());

    // Fetch posts for the category with pagination
    const response = await fetch(`${API_URL}/api/posts/by-category/${category.id}?page=${page}&pageSize=${pageSize}`).then(res => res.json());

    return {
        props: { 
            category, 
            posts: response.posts,
            pagination: response.pagination,
            currentPage: parseInt(page)
        },
    };
}

export default function Category({ category, posts, pagination, currentPage }) {
    const router = useRouter();
    
    // Initialize masonry layout when posts change
    useMasonryInit(posts && posts.length > 0, [posts, currentPage]);

    if (!posts || posts.length === 0) {
        return (
            <Layout>
                <section id="page-header">
                    <div className="row current-cat">
                        <div className="col-full">
                            <h1>Category: {category.name}</h1>
                        </div>
                    </div>
                </section>
                <section id="bricks" className="with-top-sep">
                    <div className="row">
                        <div className="col-full">
                            <p>No posts found in this category.</p>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section id="page-header">
                <div className="row current-cat">
                    <div className="col-full">
                        <h1>Category: {category.name}</h1>
                    </div>
                </div>
            </section>
            <section id="bricks" className="with-top-sep">
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
                  {pagination && (
                    <Pagination 
                        currentPage={currentPage}
                        pageCount={pagination.pageCount}
                        baseUrl={`/categories/${category.slug}`}
                    />
                )}
            </section>
        </Layout>
    );
}