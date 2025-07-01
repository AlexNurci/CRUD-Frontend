import React from "react";
import { createRoot } from "react-dom/client";
import "./AppStyles.css";
import NavBar from "./components/NavBar";
import Campus from "./components/Campus";
import Student from "./components/Student";
import SingleStudent from "./components/SingleStudent";

import { BrowserRouter as Router, Routes, Route } from "react-router";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="app">
        <h1>Hello React!</h1>
        <img className="react-logo" src="/react-logo.svg" alt="React Logo" />

        <Routes>
          <Route path="/campuses" element={<Campus />} />
          <Route path="/students" element={<Student />} />
          <Route path="/students/:studentId" element={<SingleStudent />} />
          <Route path="/campuses/:campusId" element={<SingleCampus />} />
        </Routes>
      </div>
    </div>
  );
};

// We're using React Router to handle the navigation between pages.
// It's important that the Router is at the top level of our app,
// and that we wrap our entire app in it. With this in place, we can
// declare Routes, Links, and use useful hooks like useNavigate.
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
