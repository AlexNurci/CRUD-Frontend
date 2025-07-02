import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SingleCampus = () => {
  const { campusId } = useParams();
  const [campus, setCampus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/campuses/${campusId}`
        );
        setCampus(res.data);
      } catch (error) {
        console.error("Error fetching campus:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampus();
  }, [campusId]);

  if (loading) return <p>Loading student data...</p>;
  if (!campus) return <p>Loading campus...</p>;

  return (
    <div>
      <h2>{campus.name}</h2>
      <p>{campus.description}</p>

      <h3>Enrolled Students</h3>
      <ul>
        {campus.students && campus.students.length > 0 ? (
          campus.students.map((student) => (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>
                {student.firstName} {student.lastName}
              </Link>
            </li>
          ))
        ) : (
          <p>No students enrolled.</p>
        )}
      </ul>
    </div>
  );
};

export default SingleCampus;
