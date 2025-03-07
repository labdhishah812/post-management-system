import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from './pages/Auth/SignupPage';
import CreatePost from "./pages/Posts/CreatePost";
import EditPost from "./pages/Posts/EditPost";
import PostsList from "./pages/Posts/PostList";
import Dashboard from "./pages/Dashboard/Dashboard";


const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <SignupPage />}
        />
        <Route
          path="/create-post"
          element={user ? <CreatePost /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-post/:id"
          element={user ? <EditPost /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-posts"
          element={user ? <PostsList /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
