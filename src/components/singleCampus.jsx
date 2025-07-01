import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//display a single Camps...

const singleCampus = ({ campus, fetchAllCampuses }) => {
  const { id } = useParams();
  const campusId = Number(id);

  useEffect(() => {
    fetchAllCampuses();
  }, [fetchAllCampuses]);

  const selectedCampus = campus.find((campus) => campus.id === campusId);

  if (!selectedCampus) {
    return <p> Loading or campus not found. </p>;
  }

  return (
    <div>
      <h2>{selectedCampus.name}</h2>
      <img></img>
      <h2>{selectedCampus.address}</h2>
      <h2>{selectedCampus.description}</h2>

      <h3>Students</h3>
      {selectedCampus.students && selectedCampus.students.length > 0 ? (
        <ul>
          {selectedCampus.students.map((students) => (
            <li key={students.id}>{students.name}</li>
          ))}
        </ul>
      ) : (
        <p> No students are currently enrolled in this campus. </p>
      )}
    </div>
  );
};

export default singleCampus; 