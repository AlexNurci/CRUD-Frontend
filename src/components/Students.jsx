import React, { useState, useEffect } from "react";
import "./component.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router";
import AddStudent from "./AddStudent";
import "./styles.css";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/students")
      .then((response) => setStudents(response.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/campuses`)
      .then((response) => setCampuses(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${studentId}`);
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  const campusById = React.useMemo(() => {
    const map = {};
    campuses.forEach((c) => (map[c.id] = c));
    return map;
  }, [campuses]);

  return (
    <div>
      <h2>All Students</h2>
      <Routes>
        <Route path="/add-student" element={<AddStudent />} />
      </Routes>
      <br></br>
      <NavLink className="add" to="/add-student">
        Add Student
      </NavLink>
      <ul>
        {students.map((student) => {
          const campus = campusById[student.CampusId];
          return (
            <li key={student.id} className="students">
              <div className="box">
                <div className="content-box">
                  <h3>
                  <NavLink className="nav-link" to={`/students/${student.id}`}>
                    {student.firstName} {student.lastName}
                  </NavLink>
                </h3>
                </div>
                <p> GPA: {student.gpa}</p>
                <p>{student.email}</p>
                <p>Campus: {campus ? campus.campusName : "Not assigned"}</p>
              </div>

              <div className="button-group">
                <button
                  className="deleteButton"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete Student
                </button>

                <NavLink
                  className="editButton"
                  to={`/students/${student.id}/edit`}
                >
                  Edit Student
                </NavLink>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
//  <Routes>
//     <Route path={`/students/${student.id}/edit`} element={<EditStudent />}/>
//  </Routes>
export default AllStudents;
