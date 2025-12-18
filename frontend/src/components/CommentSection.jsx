import React, { useEffect, useState } from "react";
import { Button, Input } from "./index"; // adjust path if needed
import commentService from "../service/comment.service";
import { useSelector } from "react-redux";

function CommentsSection(post) {
  console.log(post);

  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [editCommentID, setEditCommentID] = useState("");

  useEffect(() => {
    setComments(post.post.comments);
  }, []);

  const userId = useSelector((state) => state.auth?.userData?._id);

  const handleCreateComment = () => {
    if (commentMessage !== "") {
      commentService
        .create(commentMessage, post?.post?._id)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setCommentMessage("");
        });
    }
  };
  const handleEditComment = () => {
    commentService
      .update(updateMessage, editCommentID)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setEdit(false);
      });
  };
  const handleDeleteComment =(commentID)=>{
    console.log(commentID);
    
    commentService
    .delete(commentID)
    .then((data)=>{
      console.log(data);
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }
  return (
    <div className="mt-14 bg-gray-600/40 rounded-3xl p-8 border border-gray-400/30">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-white">
          Comments
          <span className="ml-3 text-sm font-normal text-gray-300">
            {comments.length}
          </span>
        </h2>
      </div>

      {/* Create Comment (YouTube style) */}
      <div className="flex gap-4 mb-10">
        <div className="w-10 h-10 rounded-full bg-gray-500/60 flex items-center justify-center text-white font-semibold">
          U
        </div>

        <div className="flex-1">
          <Input
            type="text"
            value={commentMessage}
            onChange={(e) => {
              setCommentMessage(e.target.value);
            }}
            placeholder="Add a comment..."
            className="text-gray-800 w-full bg-transparent border-b border-gray-400/40 focus:border-white  outline-none pb-2 placeholder:text-gray-400"
          />

          <div className="flex justify-end gap-3 mt-3">
            <Button
              onClick={() => {
                setCommentMessage("");
              }}
              bgColor="bg-gray-500"
              className="text-xs px-4 py-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateComment}
              bgColor="bg-blue-500"
              className="text-xs px-4 py-1"
            >
              Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-400/30 mb-8" />

      {/* Comments List */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div
            key={comment?._id}
            className="flex gap-4 p-5 rounded-2xl bg-gray-700/40 border border-gray-500/30 hover:bg-gray-700/60 transition"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-500/60 flex items-center justify-center text-white font-semibold">
              {comment?.writtenBy?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Meta row */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-white">
                    {comment.writtenBy}
                  </p>
                  <p className="text-xs text-gray-300">
                    {new Date(
                      comment.updatedAt || comment.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                {/* Actions (UI only) */}
                <div className="flex gap-2">
                  {userId == comment?.writtenBy ? (
                    <>
                      {!edit && (
                        <Button
                          bgColor="bg-gray-500"
                          className="text-xs px-3 py-1 shadow-sm"
                          onClick={() => {
                            setEditCommentID(comment._id);
                            setUpdateMessage(comment.message);
                            setEdit(true);
                          }}
                        >
                          Edit
                        </Button>
                      )}
                      <Button
                        bgColor="bg-red-500"
                        className="text-xs px-3 py-1 shadow-sm"
                        onClick={()=>{
                          handleDeleteComment(comment?._id)
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Message */}
              {edit && editCommentID === comment?._id ? (
                <div>
                  <input
                    type="text"
                    value={updateMessage}
                    onChange={(e) => {
                      setUpdateMessage(e.target.value);
                    }}
                    className="text-gray-800 dark:text-gray-200 w-full bg-transparent border-b border-gray-400/40 focus:border-white  outline-none pb-2 placeholder:text-gray-400"
                  />
                  <Button
                    onClick={handleEditComment}
                    bgColor="bg-blue-500"
                    className="text-xs px-4 py-1 m-2"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      setEdit(false);
                    }}
                    bgColor="bg-blue-500"
                    className="text-xs px-4 py-1 m-2"
                  >
                    Cancle
                  </Button>
                </div>
              ) : (
                <p className="text-gray-100 leading-relaxed">
                  {comment.message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;
