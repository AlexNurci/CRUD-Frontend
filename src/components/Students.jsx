import React, { useState, useEffect } from "react";
import "./component.css";
import axios from "axios";

const AllStudents = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Hardcoded Student 1",
    },
    {
      id: 2,
      name: "Hardcoded Student 2",
    },
  ]);

  useEffect(() => {
    axios
      .get("/api/students")
      .then((response) => setStudents(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`/api/students/${studentId}`);
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <h3>{student.name}</h3>
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
