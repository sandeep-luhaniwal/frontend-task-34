import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", email: "", number: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/submit", form);
      alert("Form submitted successfully!");
      setForm({ name: "", email: "", number: "" });
    } catch (error) {
      alert("Submission failed!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Submit Info</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required /><br />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required /><br />
        <input name="number" value={form.number} onChange={handleChange} placeholder="Phone Number" required /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
