import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context";
import axios from "axios";
import Comment from "./Comment";

function Comments({ chapterInfo }) {
  const { userData, isLoggedIn, toggleLoginModalVisibility, changeAlert } =
    useGlobalContext();

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
        .post(`${process.env.REACT_APP_BASE_URL}/comment/addComment`, data)
        .then((res) => {
          console.log(res.data);
          //getComments();
          //console.log()
          setComments([...comments, res.data.comment]);
          changeAlert(res.data.msg);
        });
    }
  };

  const getComments = async () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/comment/getComments/` +
          chapterInfo.id
      )
      .then((res) => {
        console.log(res.data);
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
          return <Comment commentId={comment} chapterId={chapterInfo.id} />;
        })}
      </ul>
    </div>
  );
}

export default Comments;
