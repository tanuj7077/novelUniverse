import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context";
import axios from "axios";
import Comment from "./Comment";

function Comments({ chapterInfo }) {
  const {
    userData,
    isLoggedIn,
    getUpdatedUserData,
    toggleLoginModalVisibility,
  } = useGlobalContext();

  const [myComment, setMyComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = () => {
    if (!isLoggedIn) {
      toggleLoginModalVisibility();
    } else {
      let data = {
        userId: userData._id,
        chapterId: chapterInfo.id,
        text: myComment,
      };
      axios
        .post("http://localhost:8000/comment/addComment", data)
        .then((res) => {
          getComments();
        });
    }
  };

  const getComments = async () => {
    axios
      .get("http://localhost:8000/comment/getComments/" + chapterInfo.id)
      .then((res) => {
        setComments(res.data.data);
      });
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <div className={`chapterPage-comments `}>
      <p className="heading">Comments</p>
      <section className="myComment">
        <textarea
          type="text"
          className="commentInput"
          value={myComment}
          placeholder="Write comment here"
          onChange={(e) => setMyComment(e.target.value)}
        ></textarea>
        {myComment.length > 0 && (
          <button className="commentSubmit" onClick={handleCommentSubmit}>
            Submit
          </button>
        )}
      </section>
      <ul className="comments">
        {comments.map((comment) => {
          return <Comment comment={comment} chapterId={chapterInfo.id} />;
        })}
      </ul>
    </div>
  );
}

export default Comments;
