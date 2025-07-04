import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import axios from "axios";

const SingleStudent = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/students/${studentId}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (loading) return <p>Loading student data...</p>;
  if (!student) return <p>Student not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{student.firstName} {student.lastName}</h2>
      <img
        src={student.imageUrl || "https://via.placeholder.com/150"}
        alt="Student"
        style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "15px" }}
      />
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>GPA:</strong> {student.gpa ?? "N/A"}</p>

      {student.campus ? (
        <p>
          <strong>Enrolled Campus:</strong>{" "}
          <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link>
        </p>
      ) : (
        <p>This student is not enrolled in any campus.</p>
      )}
    </div>
  );
};

export default SingleStudent;
