import categories from '../../../data/categories.json'; 

export default function handler(req, res) {
    const { slug } = req.query;

    if (req.method === 'GET') {
        const category = categories.find(cat => cat.slug === slug);

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: `Category with slug ${slug} not found` });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


