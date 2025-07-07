import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import AddCampus from "./AddCampus";
import EditCampus from "./EditCampus";
import "./styles.css";

const AllCampuses = () => {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/campuses")
      .then((response) => setCampuses(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (campusId) => {
    try {
      await axios.delete(`http://localhost:8080/api/campuses/${campusId}`);

      setCampuses((prev) => prev.filter((campus) => campus.id !== campusId));
    } catch (error) {
      console.error("Failed to delete campus:", error);
    }
  };

  return (
    <div>
      <h2>All Campuses</h2>
        <Routes>
          <Route path="/add-campus" element={<AddCampus />}/>
        </Routes>
        <br></br>
        <NavLink className="add" to="/add-campus">Add Campus</NavLink>
      <ul>
        {campuses.map((campus) => (
          <li key={campus.id} className="campuses">
            <br></br>
            <h3><NavLink className="nav-link" to={`/campuses/${campus.id}`}>{campus.campusName}</NavLink></h3>
            <p>Location: {campus.address}</p>
            <p>{campus.students} students</p>
            <p>{campus.description}</p>
            {campus.image && (
              <img src={campus.image} alt={`${campus.name} campus`} />
            )}
            <br></br>
            <br></br>
            <button className="deleteButton" onClick={() => handleDelete(campus.id)}>
              Delete Campus
            </button>
            <br></br>
        <Routes>
          <Route path={`/campuses/${campus.id}/edit`} element={<EditCampus />}/>
        </Routes>
        <br></br>
        <NavLink className="editButton" to={`/campuses/${campus.id}/edit`}>Edit Campus</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default AllCampuses;
