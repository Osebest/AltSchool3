import "./App.css";
import {
  NavLink,
  useNavigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Userspage } from "./components/Userspage";
import Error from "./Error";
import { StateContext } from "./Context/Context";
import { useState, useEffect } from "react";
import PostDetails from "./components/PostDetails";
import Homepage from "./components/Homepage";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const route = useLocation();
  
  useEffect(() => {
    if (route.pathname === "/") {
      setHome(true);
    }else(
      setHome(false)
    )
    
    if(route.pathname==="/error"){
      setError(true);
    }else{
      setError(false);
    }
  }, [route])
  

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    setPosts([]);
    navigate(`/user/${username}`);
    fetchPosts();
  };

  const fetchPosts = () => {
    setUsername("");
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        setPosts(response.data);
        return response.data;
      })
      .catch((err) => {
        alert("User not found");
        setPosts([]);
      });
  };

  return (
    <StateContext.Provider value={{ posts, setPosts }}>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid py-2">
            <NavLink>
              <span className="navbar-brand fs-3 fw-bolder">GitHub App</span>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav w-100 me-auto mb-2 mb-md-0">
                <li className="nav-item px-3">
                  <NavLink to={"/"}>
                    <span className={`nav-link fs-5 ${home?'active':''}`}>Home</span>
                  </NavLink>
                </li>
                <li className="nav-item px-3">
                  <NavLink to={"/error"}>
                    <span className={`nav-link fs-5 ${error?'active':''}`}>Error</span>
                  </NavLink>
                </li>
              </ul>
              <form className="d-flex w-100" onSubmit={(e) => onSubmit(e)}>
                <input
                  className="form-control me-2"
                  type="search"
                  value={username}
                  placeholder="Github Username"
                  onChange={(e) => setUsername(e.target.value)}
                />

                <button className="btn btn-outline-success px-4" type="submit">
                  {loading ? "Searching..." : "Search"}
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user/:name" element={<Userspage />} />
        <Route path="/repo/:id" element={<PostDetails posts={posts} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </StateContext.Provider>
  );
}

export default App;
