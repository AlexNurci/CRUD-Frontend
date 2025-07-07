import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router";
import AddCampus from "./AddCampus";
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
        <Route path="/add-campus" element={<AddCampus />} />
      </Routes>
      <br></br>
      <NavLink className="add" to="/add-campus">
        Add Campus
      </NavLink>
      <ul>
        {campuses.map((campus) => (
          <li key={campus.id} className="campuses">
            <div className="box">
              <div className="content-box">
                <h3>
                  <NavLink className="nav-link" to={`/campuses/${campus.id}`}>
                    {campus.campusName}
                  </NavLink>
                </h3>
                <p>Location: {campus.address}</p>
                <p>Students: {Array.isArray(campus.students) ? campus.students.length : 0} </p>
                <div className="description-box">
                  <p>{campus.description}</p>
                </div>
                
              </div>
              <div className="image-box">
                {campus.image && (
                  <img src={campus.image} alt={`${campus.campusName} campus`} />
                )}
              </div>
            </div>

            <div className="button-group">
              <button
                className="deleteButton"
                onClick={() => handleDelete(campus.id)}
              >
                Delete Campus
              </button>
              <NavLink
                className="editButton"
                to={`/campuses/${campus.id}/edit`}
              >
                Edit Campus
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCampuses;
