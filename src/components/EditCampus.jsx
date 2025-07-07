import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const EditCampus = () => {
  const { campusId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    campusName: "",
    address: "",
    students: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/campuses/${campusId}`
        );
        setFormData({
          campusName: data.campusName ?? "",
          address:    data.address    ?? "",
          image:      data.image      ?? "",
          description:data.description?? "",
        });
      } catch (err) {
        console.error("Could not fetch campus:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [campusId]);

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/campuses/${campusId}`,
        formData
      );
      navigate(`/campuses/${campusId}`);
    } catch (err) {
      console.error("Failed to update campus:", err);
    }
  };

  if (loading) return <p>Loading campus…</p>;

  return (
    <>
      <h2>Edit Campus</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="campusName"
          placeholder="Campus Name"
          value={formData.campusName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <button className="add" type="save">Save</button>
      </form>
    </>
  );
};

export default EditCampus;
