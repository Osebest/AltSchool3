import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../Context/Context";
import axios from "axios";
import { PostList } from "./PostList";
import { Pagination } from "./Pagination";

export const Hompage = () => {
  const { posts, setPosts } = useContext(StateContext);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [currentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(()=>{
    
  }, [posts])

  // Get current posts
  let indexOfLastPost = currentPage * postsPerPage;
  let indexOfFirstPost = indexOfLastPost - postsPerPage;

  

  // Change Page
  const paginate = (pageNumber, data) => {
    let indexOfLastPostP = pageNumber * postsPerPage;
    let indexOfFirstPostP = indexOfLastPostP - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPostP, indexOfLastPostP);
    setContent(
      <div>
        <h5 className="container">Repos</h5>
        <div className="container">
          <ol className="list-group list-group-numbered">
            {currentPosts.map((post) => (
              <PostList post={post} key={post.id} />
            ))}
          </ol>
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate}
          data={data}
        />
      </div>
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchPosts()
  }

  const fetchPosts = () => {
    setLoading(true);
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
        return response.data;
      })
      .then((data) => {
        const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
        setContent(
          <div>
            <h5 className="container">Repos</h5>
            <div className="container">
              <ol className="list-group list-group-numbered">
                {currentPosts.map((post) => (
                  <PostList post={post} key={post.id} />
                ))}
              </ol>
            </div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={data.length}
              paginate={paginate}
              data={data}
            />
          </div>
        );
      })
      .catch((err) => {
        setContent(
          <>
            <h5 className="container">Repos</h5>
            <div className="container">
              <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <h5>Invalid User</h5>
                  </div>
                </li>
              </ol>
            </div>
          </>
        );
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="mb-5">GitHub App</h2>
      <form className="container form w-100 d-flex justify-content-center">
        <input
          type="search"
          value={username}
          placeholder="Github username"
          onChange={(e) => setUsername(e.target.value)}
          className="input w-50 px-2 py-3"
        />
        <button
          className="btn btn-secondary px-5 py-2"
          onClick={(e) => handleClick(e)}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      <div className="container mt-5 mb-5">{content}</div>
    </div>
  );
};
