import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";

function App() {
  return (
      <Router>
        <div className="wrapper">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route exact path="/posts/new" element={<CreatePostPage />} />
              <Route exact path="/posts/:id" element={<PostPage />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;