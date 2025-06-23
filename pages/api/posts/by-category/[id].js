import posts from '../../../../data/posts.json'; // Adjust the path as necessary

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const categoryPosts = posts.filter(post => post.categoryId === id);

        if (categoryPosts) {
            res.status(200).json(categoryPosts);
        } else {
            res.status(404).json({ message: `Posts with categoryId ${id} not found` });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
