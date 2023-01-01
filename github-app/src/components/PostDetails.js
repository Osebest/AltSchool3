import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostDetails({posts}) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // eslint-disable-next-line
  const details = posts.filter(post => post.id == id)
  console.log(details)


  return (
    <div className="container mb-5 d-flex flex-column justify-content-center align-items-center content">
      <h2>Repo Details</h2>
      <div className="card w-75 mb-5 mt-4 text-center">
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
        <button onClick={()=>navigate(-1)} className="card-link bg-dark">
            Go back
        </button>
      </div>
    </div>
  );
}
