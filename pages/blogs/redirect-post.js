export async function getServerSideProps(context) {
  const { type } = context.query;

  const res = await fetch(`http://localhost:3000/api/posts/single-by-type?type=${type}`);
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
