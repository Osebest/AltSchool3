import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { paginate } from "./paginate";
import { StateContext } from "../Context/Context";

export default function Homepage() {
  const { setPosts } = useContext(StateContext);
  const [ose, setOse] = useState({});
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    axios.get(`https://api.github.com/users/osebest`).then((response) => {
      setOse(response.data);
    });
    axios.get(`https://api.github.com/users/osebest/repos`).then((response) => {
      setPosts(response.data);
      paginate(1, response.data, setContent);
    });
  }, []);

  return (
    <div className="content container">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <img src="https://usagif.com/wp-content/uploads/loading-10.gif" alt="" className="imgL"/>
        </div>
      ) : (
        <>
          <h2 className="mb-5 pb-3 text-secondary text-center">
            Welcome to {ose.login}'s GitHub
          </h2>
          <div className="row featurette align-items-center">
            <div className="col-md-7">
              <h2 className="featurette-heading">
                {ose.name}. <span className="text-muted">#{ose.login}</span>
              </h2>
              <p className="lead">{ose.bio}</p>
              <small>{ose.location}</small>
            </div>
            <div className="col-md-5">
              <img
                src={ose.avatar_url}
                alt=""
                className="featurette-image img-fluid mx-auto"
              />
            </div>
          </div>
          {content}
        </>
      )}
    </div>
  );
}
