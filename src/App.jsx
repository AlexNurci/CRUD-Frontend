import React from "react";
import { createRoot } from "react-dom/client";
import "./AppStyles.css";
import NavBar from "./components/NavBar";
import Campuses from "./components/Campuses";
import Students from "./components/Students";
import SingleStudent from "./components/SingleStudent";
import SingleCampus from "./components/singleCampus";
<<<<<<< HEAD
=======
import AddStudent from "./components/AddStudent";
import AddCampus from "./components/AddCampus";
import EditCampus from "./components/EditCampus";
import EditStudent from "./components/EditStudent";
import Home from "./components/Home";

>>>>>>> 19e8a32345fc1432e71361b31f077cbc1a35dd23

import { BrowserRouter as Router, Routes, Route } from "react-router";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="app">
        <Routes>
<<<<<<< HEAD
=======
          <Route path="/" element={<Home />} />
>>>>>>> 19e8a32345fc1432e71361b31f077cbc1a35dd23
          <Route path="/campuses" element={<Campuses />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:studentId" element={<SingleStudent />} />
          <Route path="/campuses/:campusId" element={<SingleCampus />} />
<<<<<<< HEAD
=======
          <Route path="/add-student/" element={<AddStudent />} />
          <Route path="/add-campus/" element={<AddCampus />}/>
          <Route path="/campuses/:campusId/edit" element={<EditCampus />} />
          <Route path="/students/:studentId/edit" element={<EditStudent />} />
>>>>>>> 19e8a32345fc1432e71361b31f077cbc1a35dd23
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