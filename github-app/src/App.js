import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Hompage } from "./components/Hompage";
import Error from "./Error";
import { StateContext } from "./Context/Context";
import { useState } from "react";
import PostDetails from "./components/PostDetails";

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <StateContext.Provider value={{ posts, setPosts }}>
      <Router>
        <Routes>
          <Route path="/" element={<Hompage />} />
          <Route path="/repo/:id" element={<PostDetails posts={posts}/>}/>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </StateContext.Provider>
  );
}

export default App;
