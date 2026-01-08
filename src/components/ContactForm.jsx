import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function ContactForm({ onContactAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    console.log("Submitted form --> :", formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/contact",
        formData
      );

      console.log("axios res-->", response);

      toast.success("Form submitted successfully");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});


      if (onContactAdded) {
        onContactAdded();
      }
  
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit form");
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Contact Us
        </h2>

        {/* Name */}
        <div>
          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <textarea
          name="message"
          placeholder="What's on your mind?"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 rounded-lg font-medium transition duration-200 ${
            isFormValid
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;