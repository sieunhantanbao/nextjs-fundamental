import { API_URL } from '../../config';

export async function getServerSideProps(context) {
  const { type } = context.query;

  const res = await fetch(`${API_URL}/api/posts/single-by-type?type=${type}`);
  const post = await res.json();

  if (res.ok && post?.id) {
    // Map type to the appropriate subpath
    const typeMap = {
      standard: "standard-posts",
      audio: "standard-audios",
      video: "standard-videos",
      gallery: "standard-galleries",
    };

    const subPath = typeMap[type];

    if (subPath) {
      return {
        redirect: {
          destination: `/blogs/${subPath}/${post.id}`,
          permanent: false,
        },
      };
    }
  }

  // Handle unknown types or missing post
  return {
    notFound: true,
  };
}

export default function Redirecting() {
  return null;
}
