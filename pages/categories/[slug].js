import Layout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import renderPostByType from '../../components/commons/renderPostType';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useMasonryInit from '../../hooks/useMasonryInit';

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const { page = 1 } = context.query;
    const pageSize = 8;
    
    // Fetch category data from API
    const category = await fetch(`http://localhost:3000/api/categories/${slug}`).then(res => res.json());

    // Fetch posts for the category with pagination
    const response = await fetch(`http://localhost:3000/api/posts/by-category/${category.id}?page=${page}&pageSize=${pageSize}`).then(res => res.json());

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

    // Function to generate page numbers
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(pagination.pageCount, startPage + maxPagesToShow - 1);
        
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        
        return pageNumbers;
    };

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
                
                {pagination && pagination.pageCount > 1 && (
                    <div className="row">
                        <nav className="pagination">
                            {currentPage > 1 ? (
                                <Link href={`/categories/${category.slug}?page=${currentPage - 1}`} legacyBehavior>
                                    <a className="page-numbers prev">Prev</a>
                                </Link>
                            ) : (
                                <span className="page-numbers prev inactive">Prev</span>
                            )}
                            
                            {getPageNumbers().map(num => 
                                num === currentPage ? (
                                    <span key={num} className="page-numbers current" aria-current="page">
                                        {num}
                                    </span>
                                ) : (
                                    <Link key={num} href={`/categories/${category.slug}?page=${num}`} legacyBehavior>
                                        <a className="page-numbers">{num}</a>
                                    </Link>
                                )
                            )}
                            
                            {currentPage < pagination.pageCount ? (
                                <Link href={`/categories/${category.slug}?page=${currentPage + 1}`} legacyBehavior>
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