import React from "react";
import { Link } from "react-router-dom";

function PostCard({ _id, title, featuredImage, createdAt }) {
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(
    new Date(createdAt)
  );
  return (
    <Link to={`/post/${_id}`}>
      <div className="w-full dark:bg-gray-100 bg-gray-600 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img src={featuredImage} alt={title} className="rounded-xl" />
          <h2 className="dark:text-black text-white text-xl font-bold">
            {title}
          </h2>
          <div>Posted on: {formattedDate}</div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
