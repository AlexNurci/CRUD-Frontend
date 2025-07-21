import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const EditStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gpa: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://crud-backend-weld-seven.vercel.app/api/students/${studentId}`
        );
        setFormData({
          firstName: data.firstName ?? "",
          lastName:    data.lastName    ?? "",
          gpa:   data.gpa   ?? "",
          email:      data.email      ?? "",
        });
      } catch (err) {
        console.error("Could not fetch student:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [studentId]);

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://crud-backend-weld-seven.vercel.app/api/students/${studentId}`,
        formData
      );
      navigate(`/students/${studentId}`);
    } catch (err) {
      console.error("Failed to update student:", err);
    }
  };

  if (loading) return <p>Loading student…</p>;

  return (
    <>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="gpa"
          placeholder="What is your gpa"
          value={formData.gpa}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          placeholder="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <button className="add" type="save">Save</button>
      </form>
    </>
  );
};

export default EditStudent;
