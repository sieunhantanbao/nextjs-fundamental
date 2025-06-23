import { useEffect, useState } from 'react';

export default function Comment({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postId) return;

        const fetchComments = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/posts/comments/${postId}`);
                if (!res.ok) throw new Error('Failed to load comments');

                const data = await res.json();
                setComments(data);
            } catch (err) {
                setError(err.message || 'Unexpected error');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error: {error}</p>;
    if (comments.length === 0) return <p>No comments found.</p>;

    return (
        <div className="comments-wrap">
            <div id="comments" className="row">
                <div className="col-full">
                    <h3>{comments.length} Comments</h3>
                    <ol className="commentlist">
                        {comments.map(comment => (
                            <li className="depth-1">
                                <div className="avatar">
                                    <img width="50" height="50" className="avatar" src={comment.avatarUrl} alt={comment.commenterName} />
                                </div>
                                <div className="comment-content">
                                    <div className="comment-info">
                                        <cite>{comment.commenterName}</cite>
                                        <div className="comment-meta">
                                            <time className="comment-time" dateTime={new Date(comment.createdDate).toLocaleString()}>{new Date(comment.createdDate).toLocaleString()}</time>
                                            <span className="sep">/</span><a className="reply" href="#">Reply</a>
                                        </div>
                                    </div>
                                    <div className="comment-text">
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div className="respond">
                        <h3>Leave a Comment</h3>
                        <form name="contactForm" id="contactForm" method="post" action="">
                            <fieldset>
                                <div className="form-field">
                                    <input name="cName" type="text" id="cName" className="full-width" placeholder="Your Name" defaultValue="" />
                                </div>
                                <div className="form-field">
                                    <input name="cEmail" type="text" id="cEmail" className="full-width" placeholder="Your Email" defaultValue="" />
                                </div>
                                <div className="form-field">
                                    <input name="cWebsite" type="text" id="cWebsite" className="full-width" placeholder="Website" defaultValue="" />
                                </div>
                                <div className="message form-field">
                                    <textarea name="cMessage" id="cMessage" className="full-width" placeholder="Your Message"></textarea>
                                </div>
                                <button type="submit" className="submit button-primary">Submit</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}