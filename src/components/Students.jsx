import React, { useState, useEffect } from "react";
import "./component.css";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import AddStudent from "./AddStudent";

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/students")
      .then((response) => setStudents(response.data))
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

  return (
    <div>
      <h2>All Students</h2>
        <Routes>
          <Route path="/add-student" element={<AddStudent />}/>
        </Routes>
        <NavLink to="/add-student">Add Student</NavLink>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <h3>
              {student.firstName} {student.lastName}
            </h3>
            <p> GPA: {student.gpa}</p>
            <p>{student.email}</p>
            <button onClick={() => handleDelete(student.id)}>
              Delete Student
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllStudents;
