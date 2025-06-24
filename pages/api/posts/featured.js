import posts from '../../../data/posts.json';

export default function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const featuredPosts = posts.filter(post => post.isFeatured);
            res.status(200).json(featuredPosts);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching featured posts', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
