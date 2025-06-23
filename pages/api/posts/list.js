import posts from '../../../data/posts.json';

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Get pagination parameters from query string
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 9;
        
        // Calculate pagination values
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedPosts = posts.slice(startIndex, endIndex);
        
        // Return paginated data with metadata
        res.status(200).json({
            posts: paginatedPosts,
            pagination: {
                page,
                pageSize,
                pageCount: Math.ceil(posts.length / pageSize),
                total: posts.length
            }
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}