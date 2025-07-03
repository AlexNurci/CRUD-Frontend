import React from "react";
import { createRoot } from "react-dom/client";
import "./AppStyles.css";
import NavBar from "./components/NavBar";
import Campus from "./components/Campus";
import Student from "./components/Student";
import { BrowserRouter as Router, Routes, Route } from "react-router";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="app">
        <Routes>
<<<<<<< HEAD
          <Route path="/campuses" element={<Campus />} />
          <Route path="/students" element={<Student />} />
=======
          <Route path="/campuses" element={<Campuses />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:studentId" element={<SingleStudent />} />
          <Route path="/campuses/:campusId" element={<SingleCampus />} />
          <Route path="/add-student/" element={<AddStudent />} />
          <Route path="/add-campus/" element={<AddCampus />}/>
>>>>>>> Alex
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