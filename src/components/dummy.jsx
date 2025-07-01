import React from "react";
import "./NavBarStyles.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//display a single Camps...

const singleCampus = ({ campus, fetchAllCampuses }) => {
  const { id } = useParams();
  const campusId = Number(id);

  useEffect(() => {
    fetchAllCampuses();
  });

  const selectedCampus = campus.find((campus) => campus.id === campusId);

  if (!selectedCampus) {
    return <p> Loading or campus not found. </p>;
  }

  return (
    <div>
      <h2>{selectedCampus.name}</h2>
      <h2>{selectedCampus.image}</h2>
      <h2>{selectedCampus.address}</h2>
      <h2>{selectedCampus.description}</h2>
    </div>
  );
};
