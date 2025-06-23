import StandardPost from '../postTypes/StandardPost';
import VideoPost from '../postTypes/VideoPost';
import GalleryPost from '../postTypes/GalleryPost';
import AudioPost from '../postTypes/AudioPost';

export default function renderPostByType(post) {
  switch (post.type) {
    case 'standard':
      return <StandardPost post={post} />;
    case 'video':
      return <VideoPost post={post} />;
    case 'gallery':
      return <GalleryPost post={post} />;
    case 'audio':
      return <AudioPost post={post} />;
    default:
      return <div>Unknown post type: {post.type}</div>;
  }
}
