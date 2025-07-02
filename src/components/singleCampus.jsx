import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleCampus = () => {
  const { campusId } = useParams();
  const [campus, setCampus] = useState(null);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/campuses/${campusId}`);
        setCampus(res.data);
      } catch (error) {
        console.error("Error fetching campus:", error);
      }finally{
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
      <img src={campus.imageUrl} alt={campus.name} />
      <h3>{campus.address}</h3>
      <p>{campus.description}</p>

      <h3>Students</h3>
      {campus.students && campus.students.length > 0 ? (
        <ul>
          {campus.students.map((student) => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      ) : (
        <p>No students are currently enrolled.</p>
      )}
    </div>
  );
};

export default SingleCampus;