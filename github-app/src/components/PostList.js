import React from "react";
import { Link } from "react-router-dom";

export const PostList = ({ post }) => {
  const {name, id} = post;
  return (
    <Link to={`/repo/${id}`} className="link">
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            <h6>Title</h6>
          </div>
          <h5>{name}</h5>
        </div>
      </li>
    </Link>
  );
};
