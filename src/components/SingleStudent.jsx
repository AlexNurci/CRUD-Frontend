import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { Routes, Route } from "react-router";
import EditStudent from "./EditStudent";

//working
const SingleStudent = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [campuses, setCampuses] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`https://crud-backend-weld-seven.vercel.app/api/students/${studentId}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  useEffect(() => {
    if (student && !student.campus && student.CampusId) {
      axios
        .get(`https://crud-backend-weld-seven.vercel.app/api/campuses/${student.CampusId}`)
        .then((res) => setCampuses(res.data))
        .catch((err) => console.error("Error fetching campus:", err));
    } else {
      setCampuses(null);
    }
  }, [student]);

  if (loading) return <p>Loading student data...</p>;
  if (!student) return <p>Student not found.</p>;

  const campusToShow = student.campus || campuses;

  return (
    <div className="single-student">
      <br></br>
      <h2 className="h2css">{student.firstName} {student.lastName}</h2>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>GPA:</strong> {student.gpa ?? "N/A"}</p>

      {campusToShow ? (
        <p>
          <strong>Enrolled Campus:</strong>{" "}
          <Link to={`/campuses/${campusToShow.id}`}>
            {campusToShow.campusName || campusToShow.name}
          </Link>
        </p>
      ) : (
        <p>No Campus</p>
      )}
        <Routes>
          <Route path={`/students/${student.id}/edit`} element={<EditStudent />}/>
        </Routes>
        <br></br>
        <NavLink className="editButton" to={`/students/${student.id}/edit`}>Edit Student</NavLink>
    </div>
  );
};

export default SingleStudent;