import posts from '../../../data/posts.json';

export default function handler(req, res) {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: "Missing 'type' query parameter." });
  }

  const match = posts.find(post => post.type === type);

  if (!match) {
    return res.status(404).json({ error: `No post found with type '${type}'` });
  }

  res.status(200).json(match);
}
