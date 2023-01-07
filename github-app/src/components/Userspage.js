import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../Context/Context";
import { paginate } from "./paginate";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Userspage = () => {
  const { posts, setPosts } = useContext(StateContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const { name } = useParams();
  // const [currentPage] = useState(1);
  // const [postsPerPage] = useState(5);

  // Get current posts
  //  let indexOfLastPost = currentPage * postsPerPage;
  //  let indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change Page
  //  const paginate = (pageNumber, data) => {
  //   // Get current posts
  //    let indexOfLastPostP = pageNumber * postsPerPage;
  //    let indexOfFirstPostP = indexOfLastPostP - postsPerPage;
  //    const currentPosts = data.slice(indexOfFirstPostP, indexOfLastPostP);
  //    setContent(
  //      <div>
  //        <h5 className="container">Repos</h5>
  //        <div className="container">
  //          <ol className="list-group list-group-numbered">
  //            {currentPosts.map((post) => (
  //              <PostList post={post} key={post.id} />
  //            ))}
  //          </ol>
  //        </div>
  //        <Pagination
  //          postsPerPage={postsPerPage}
  //          totalPosts={data.length}
  //          paginate={paginate}
  //          data={data}
  //        />
  //      </div>
  //    );
  //  };

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${name}/repos`)
      .then((response) => {
        setPosts(response.data);
        return response.data;
      })
      .catch((err) => {
        alert("User not found");
        setPosts([]);
      });
    axios.get(`https://api.github.com/users/${name}`).then((response) => {
        setUser(response.data);
      });
  }, [name, setPosts]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    if (posts.length < 1) {
      setContent(
        <div className="container">
          <ol className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto text-dark">
                <h5>Enter a valid username... Try "Gracetemitope"</h5>
              </div>
            </li>
          </ol>
        </div>
      );
    } else {
      paginate(1, posts, setContent);
      // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      //   setContent(
      //     <div>
      //       <h5 className="container">Repos</h5>
      //       <div className="container">
      //         <ol className="list-group list-group-numbered">
      //           {currentPosts.map((post) => (
      //             <PostList post={post} key={post.id} />
      //           ))}
      //         </ol>
      //       </div>
      //       <Pagination
      //         postsPerPage={postsPerPage}
      //         totalPosts={posts.length}
      //         paginate={paginate}
      //         data={posts}
      //       />
      //     </div>
      //   );
    }
    setLoading(true);
  }, [posts]);

  return (
    <div className="container d-flex flex-column align-items-center content">
      <Helmet>
        <title>Users</title>
        <meta name="description" content="Check out the repositories of your favorite software engineers"/>
        <link rel="canonical" href={`/user/:${name}`} />
      </Helmet>
      <h2>User Profile</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <img
            src="https://usagif.com/wp-content/uploads/loading-10.gif"
            alt=""
            className="imgL"
          />
        </div>
      ) : (
        <div className="container mt-3 mb-5">
          <p className="mb-5 pb-3 text-secondary text-center lead fw-bold">
            Welcome to {user.login}'s GitHub
          </p>
          <div className="row featurette align-items-center">
            <div className="col-md-7">
              <h2 className="featurette-heading">
                {user.name}. <span className="text-muted">#{user.login}</span>
              </h2>
              <p className="lead">{user.bio}</p>
              <small>{user.location}</small>
            </div>
            <div className="col-md-5">
              <img
                src={user.avatar_url}
                alt=""
                className="featurette-image img-fluid mx-auto"
              />
            </div>
          </div>
          {content}
        </div>
      )}
    </div>
  );
};

export default Userspage;