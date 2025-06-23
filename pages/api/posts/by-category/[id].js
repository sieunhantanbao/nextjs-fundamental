import posts from '../../../../data/posts.json'; // Adjust the path as necessary

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        // Get all posts for the category
        const categoryPosts = posts.filter(post => post.categoryId === id);
        
        // Get pagination parameters from query string
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 9;
        
        // Calculate pagination values
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedPosts = categoryPosts.slice(startIndex, endIndex);
        
        // Return paginated data with metadata
        res.status(200).json({
            posts: paginatedPosts,
            pagination: {
                page,
                pageSize,
                pageCount: Math.ceil(categoryPosts.length / pageSize),
                total: categoryPosts.length,
                categoryId: id
            }
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
