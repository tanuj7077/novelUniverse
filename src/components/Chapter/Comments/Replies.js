import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context";
import axios from "axios";
import Reply from "./Reply";

function Replies({ comment }) {
  const { userData, isLoggedIn, toggleLoginModalVisibility } =
    useGlobalContext();
  const [addReplyText, setAddReplyText] = useState("");
  const [editedComment, setEditedComment] = useState();
  const [replies, setReplies] = useState([]);
  const addReply = () => {
    if (!isLoggedIn) {
      toggleLoginModalVisibility();
    } else {
      let data = {
        toUser: comment.user,
        userId: userData._id,
        text: addReplyText,
        chapterId: comment.chapter,
      };
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/comment/addReply/${comment._id}`,
          data
        )
        .then((res) => {
          setReplies([...replies, res.data.reply]);
        });
    }
  };
  const getReplies = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/comment/getReplies/${comment._id}`
      )
      .then((res) => {
        setReplies(res.data.replies);
      });
  };
  useEffect(() => {
    getReplies();
  }, []);
  return (
    <div className="replies">
      <input
        type="text"
        className="replies-input"
        placeholder="Write reply here"
        value={addReplyText}
        onChange={(e) => setAddReplyText(e.target.value)}
      />
      {addReplyText.length > 0 && (
        <button className="commentSubmit" onClick={addReply}>
          Submit
        </button>
      )}
      {replies.map((reply) => {
        return <Reply commentId={reply} />;
      })}
    </div>
  );
}

export default Replies;
