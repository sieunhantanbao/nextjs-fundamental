import fs from 'fs';
import path from 'path';

function generateComments() {
  // Read posts data from JSON file
  const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');
  const postsData = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
  const totalPosts = postsData.length;
  
  const comments = [];
  const names = [
  'Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 'Charlotte', 'Elijah', 'Amelia', 'James', 'Ava',
  'William', 'Sophia', 'Benjamin', 'Isabella', 'Lucas', 'Mia', 'Henry', 'Evelyn', 'Theodore', 'Harper',
  'Alexander', 'Ella', 'Jackson', 'Scarlett', 'Sebastian', 'Grace', 'Daniel', 'Chloe', 'Jack', 'Victoria',
  'Aiden', 'Lily', 'Matthew', 'Zoe', 'Samuel', 'Nora', 'David', 'Layla', 'Joseph', 'Hannah',
  'Michael', 'Aria', 'Owen', 'Ellie', 'Asher', 'Natalie', 'Ryan', 'Camila', 'Leo', 'Elizabeth',
  'Ezra', 'Luna', 'Julian', 'Savannah', 'Gabriel', 'Penelope', 'John', 'Stella', 'Luke', 'Violet',
  'Anthony', 'Aurora', 'Grayson', 'Maya', 'Emily', 'Willow', 'Levi', 'Emilia', 'Mateo', 'Lucy',
  'Wyatt', 'Paisley', 'Dylan', 'Aubrey', 'Isaac', 'Everly', 'Jayden', 'Audrey', 'Eli', 'Bella',
  'Joshua', 'Skylar', 'Christopher', 'Anna', 'Andrew', 'Leah', 'Lincoln', 'Samantha', 'Hunter', 'Sarah',
  'Caleb', 'Adeline', 'Nathan', 'Brooklyn', 'Christian', 'Claire', 'Isaiah', 'Lillian', 'Thomas', 'Elena'
];
  const sentences = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    "Nullam quis risus eget urna mollis ornare vel eu leo.",
    "Curabitur blandit tempus porttitor.",
    "Aenean lacinia bibendum nulla sed consectetur.",
    "Donec ullamcorper nulla non metus auctor fringilla.",
    "Maecenas sed diam eget risus varius blandit sit amet non magna.",
    "Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
    "Sed posuere consectetur est at lobortis.",
    "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
    "Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
    "Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    "Donec id elit non mi porta gravida at eget metus.",
    "Etiam porta sem malesuada magna mollis euismod.",
    "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
    "Ut fermentum massa justo sit amet risus.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
  ];
  const now = new Date();
  let id = 1;

  for (let postId = 1; postId <= totalPosts; postId++) { // Dynamically use the total number of posts
    // Generate a random number of comments between 1 and 10
    const numComments = Math.floor(Math.random() * 10) + 1;
    
    for (let i = 0; i < numComments; i++) {
      // Create comment text > 200 chars
      let commentText = '';
      while (commentText.length < 200) {
        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
        commentText += (commentText ? ' ' : '') + randomSentence;
      }

      // Random name
      const randomName = names[Math.floor(Math.random() * names.length)];

      comments.push({
        id: id++,
        postId,
        comment: commentText,
        createdDate: new Date(now.getTime() - Math.random() * 100000000).toISOString(),
        commenterName: randomName,
        avatarUrl: `https://i.pravatar.cc/40?u=${postId}-${i}-${randomName}`
      });
    }
  }

  return comments;
}

// Generate once per request
const allComments = generateComments();

export default function handler(req, res) {
  const { postId } = req.query;

  if (req.method === 'GET') {
    const filteredComments = allComments.filter(
      (comment) => comment.postId === parseInt(postId)
    );

    if (filteredComments.length > 0) {
      res.status(200).json(filteredComments);
    } else {
      res.status(404).json({ message: `No comments found for postId ${postId}` });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
