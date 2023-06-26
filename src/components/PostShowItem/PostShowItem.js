import { useEffect, useState } from "react";
import { show } from "../../utilities/post-api";
import CommentList from "../CommentList/CommentList.js";
import { likePost } from "../../utilities/post-api";
import { dislikePost } from "../../utilities/post-api";
import { createComment } from "../../utilities/comment-api";
import arrow from "../assets/arrow.svg";
import message from "../assets/Message.svg";
import grooming from "../assets/grooming.jpg";
import SaveIcon from "../SaveIcon/SaveIcon";
import "./PostShowItem.scss";
import { savePost } from "../../utilities/users-api";

export default function PostShowItem({ resourceId, user, setUser }) {
  const [post, setPost] = useState(null);
  const [likeTotal, setLikeTotal] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [userSaved, setUserSaved] = useState(user.savedResources.includes(resourceId))
  const [comments, setComments] = useState([])

  useEffect(() => {
    const getPost = async () => {
      try {
        const selectedPost = await show(resourceId);
        setPost(selectedPost);
        setLikeTotal(selectedPost.likes.length - selectedPost.dislikes.length);
        setComments(selectedPost.comments)
      } catch (err) {
        console.error(err);
      }
    };
    getPost(resourceId);
  }, [resourceId]);

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      const updatedPost = await likePost(post._id);
      setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async (e) => {
    e.stopPropagation();
    try {
      const updatedPost = await dislikePost(post._id);
      setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = await createComment(post._id, { text: commentText });
      setPost(updatedPost);
      setComments(updatedPost.comments)
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePost = async (e) => {
    e.stopPropagation()
    try {
      const updatedUser = await savePost(post._id)
      setUser(updatedUser)
      setUserSaved(updatedUser.savedResources.includes(resourceId))
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <div className="post-item">
      {post && (
        <>
          <h1 className="post-title">{post.title}</h1>
          <div className="like-component">
            <div className="like-block">
              <img
                src={arrow}
                className="up-arrow"
                height="5px"
                onClick={handleLike}
                alt="like"
              />
              {likeTotal}
              <img
                src={arrow}
                onClick={handleDislike}
                height="5px"
                alt="dislike"
              />
            </div>
            <div>
              <img src={grooming} height="300vh" alt="groomed" />
            </div>
          </div>

          <p className="post-text">{post.text}</p>
        <div className="icons-comment-input">
          <div className="icons">
            <img src={message} alt="comment" height="20px" />
            <p className="comment-count">{post.comments.length} comment</p>
            <span onClick={handleSavePost}><SaveIcon  post={post} userSaved={userSaved}/></span>
          </div>
          <div className="comment-section">
            <textarea
              className="comment-box"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="comment-button" onClick={handleCreateComment}>
              Post
            </button>
          </div>
          </div>
          <CommentList setUser={setUser} comments={comments} setComments={setComments} user={user}/>
        </>
      )}
    </div>
  );
}
