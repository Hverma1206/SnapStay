import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    inquiryType: "General", // Default value
    status: "Pending", // Static value
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.message.trim()) errors.message = "Message is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage(null);

    try {
      const response = await fetch("https://api.snapstay.in/public/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Your inquiry has been submitted successfully!");
        setFormData({ name: "", email: "", message: "", inquiryType: "General", status: "Pending" }); // Reset form
        setErrors({});
      } else {
        setErrors({ general: data.message || "Something went wrong. Please try again." });
      }
    } catch (e) {
        console.log(e)
      setErrors({ general: "Failed to submit inquiry. Check your network connection." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-slate-50 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-on-scroll">
          <h2 className="text-5xl font-bold mb-4 text-slate-900">Get in Touch</h2>
          <p className="text-slate-600 max-w-4xl mx-auto text-2xl">
            Ready to start your project? Contact us for a free consultation
          </p>
        </div>
        <div className="max-w-2xl mx-auto relative z-20">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
            {errors.general && <p className="text-red-600 text-center">{errors.general}</p>}
            {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

            <div className="relative z-30">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-300"
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
            </div>

            <div className="relative z-30">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-300"
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>

            

            <div className="relative z-30">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-300"
              ></textarea>
              {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 transform hover:translate-y-[-2px] disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
