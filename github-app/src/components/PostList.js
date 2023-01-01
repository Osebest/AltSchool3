import React from "react";
import { Link } from "react-router-dom";

export const PostList = ({ post }) => {
  const {name, id} = post;
  return (
    <Link to={`/repo/${id}`} className="link">
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto text-dark">
          <div className="fw-bold">
            <h6>Title</h6>
          </div>
          <h5>{name}</h5>
          <span className="text-decoration-underline text-dark">View details</span>
        </div>
      </li>
    </Link>
  );
};
