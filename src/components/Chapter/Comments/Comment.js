import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context";
import axios from "axios";

function Comment({ comment }) {
  console.log(comment);
  const { userData, isLoggedIn } = useGlobalContext();
  const [editedComment, setEditedComment] = useState();
  const [edit, setEdit] = useState(false);
  const editComment = () => {
    let data = {
      text: editedComment,
    };
    axios
      .post(`http://localhost:8000/comment/editComment/${comment._id}`, data)
      .then((res) => {
        console.log(res.data);
      });
  };
  useEffect(() => {
    setEditedComment(comment.text);
  }, []);
  return (
    <li className="comment">
      <div className="head">
        <p className="user">{comment.username}</p>
        <p className="date">{new Date(comment.date).toLocaleString()}</p>
      </div>
      {!edit && <p className="commentText">{comment.text}</p>}
      {edit && (
        <input
          type="text"
          value={editedComment}
          className="editText"
          onChange={(e) => setEditedComment(e.target.value)}
        />
      )}
      {!edit && (
        <div className="options">
          <div className="options-item">
            <p className="text" onClick={() => setEdit(true)}>
              Edit
            </p>
          </div>

          <div className="options-item">
            <p className="text">Reply</p>
          </div>
        </div>
      )}
      {edit && (
        <div className="options">
          <div className="options-item">
            <p className="text" onClick={() => setEdit(false)}>
              Cancel
            </p>
          </div>
          <div className="options-item">
            <p className="text" onClick={editComment}>
              Submit
            </p>
          </div>
        </div>
      )}
    </li>
  );
}

export default Comment;
