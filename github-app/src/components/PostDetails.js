import React from "react";
import { useParams } from "react-router-dom";

export default function PostDetails({posts}) {
  const { id } = useParams();
  
  // eslint-disable-next-line
  const details = posts.filter(post => post.id == id)
  console.log(details)


  return (
    <div className="container mt-5 mb-5">
      <div className="card mb-5">
        <div className="card-body">
          <h5 className="card-title">{details[0].name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Forks: {details[0].forks}</h6>
          <p className="card-text">
            Language: {details[0].language}
          </p>
          <p className="card-text">
            Size: {details[0].size}
          </p>
          <a href={details[0].clone_url} className="card-link">
            Clone Repo
          </a>
          <a href={details[0].forks_url} className="card-link">
            Fork Repo
          </a>
        </div>
      </div>
    </div>
  );
}
