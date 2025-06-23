import posts from '../../../data/posts.json'; // Adjust the path as necessary

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const post = posts.find(post => post.id === id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: `Post with id ${id} not found` });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
