import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Optional if you're using custom styles

function App() {
  const [form, setForm] = useState({ name: "", email: "", number: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submittedData, setSubmittedData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get("https://backend-task-34.onrender.com/data");
      setSubmittedData(response.data);
    } catch (err) {
      console.error("Failed to fetch submitted data", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await axios.post("https://backend-task-34.onrender.com/submit", form);
      setMessage({ type: "success", text: "Form submitted successfully!" });
      setForm({ name: "", email: "", number: "" });
      await fetchSubmittedData();
      setFormSubmitted(true); // hide form
    } catch (error) {
      const errorText =
        error.response?.data?.error || "Submission failed. Please try again!";
      setMessage({ type: "error", text: errorText });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Submit Info</h2>

        {message.text && (
          <div
            className={`mb-4 px-4 py-3 rounded text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {!formSubmitted && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              disabled={loading}
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}

        {submittedData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Submitted Entries:</h3>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {submittedData.map((item, index) => (
                <li key={index} className="p-3 border rounded-lg bg-gray-50">
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                  <p><strong>Phone:</strong> {item.number}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
