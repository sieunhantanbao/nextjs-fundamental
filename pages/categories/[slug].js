import Layout from '../../components/Layout';
import React, { useEffect } from 'react';
import renderPostByType from '../../components/commons/renderPostType';

export async function getServerSideProps(context) {
    const { slug } = context.params;

    // Fetch category data from API or DB
    const category = await fetch(`http://localhost:3000/api/categories/${slug}`).then(res => res.json());

    // Fetch posts for the category
    const posts = await fetch(`http://localhost:3000/api/posts/by-category/${category.id}`).then(res => res.json());

    return {
        props: { category: category, posts: posts },
    };
}


export default function Category({ category, posts }) {
    useEffect(() => {
    }, []);

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

            </section>
        </Layout>
    );
}