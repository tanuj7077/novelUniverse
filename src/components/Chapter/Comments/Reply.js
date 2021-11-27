import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context";
import axios from "axios";

function Reply({ commentId }) {
  console.log(commentId);
  const { userData, isLoggedIn } = useGlobalContext();
  const [editedComment, setEditedComment] = useState();
  const [comment, setComment] = useState();
  const [username, setUsername] = useState();
  const [edit, setEdit] = useState(false);
  const [newComment, setNewComment] = useState();

  const getComment = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/comment/getReply/${commentId}`)
      .then((res) => {
        setComment(res.data.data);
        setEditedComment(res.data.data.text);
        getUserName(res.data.data.user);
      });
  };
  const getUserName = (userId) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user/getUpdatedUserData/${userId}`
      )
      .then((res) => {
        console.log(res.data.userData.username);
        setUsername(res.data.userData.username);
      });
  };
  const editComment = () => {
    let data = {
      text: editedComment,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/comment/editComment/${comment._id}`,
        data
      )
      .then((res) => {
        setNewComment(res.data.data.text);
        setEdit(false);
      });
  };
  useEffect(() => {
    getComment();
  }, []);
  return (
    <>
      {comment && (
        <li className="comment">
          <div className="head">
            {username && <p className="user">{username}</p>}
            <p className="date">{new Date(comment.date).toLocaleString()}</p>
          </div>
          {!edit && !newComment && (
            <p className="commentText">{comment.text}</p>
          )}
          {!edit && newComment && <p className="commentText">{newComment}</p>}
          {edit && (
            <input
              type="text"
              value={editedComment}
              className="editText"
              onChange={(e) => setEditedComment(e.target.value)}
            />
          )}
          <div className="options">
            {!edit && isLoggedIn && comment.user === userData._id && (
              <div className="options-item">
                <p className="text" onClick={() => setEdit(true)}>
                  Edit
                </p>
              </div>
            )}
            {edit && (
              <div className="options-item">
                <p className="text" onClick={() => setEdit(false)}>
                  Cancel
                </p>
              </div>
            )}
            {edit && (
              <div className="options-item">
                <p className="text" onClick={editComment}>
                  Submit
                </p>
              </div>
            )}
          </div>
        </li>
      )}
    </>
  );
}

export default Reply;
