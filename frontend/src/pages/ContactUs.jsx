import React, { useState } from "react";
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from "lucide-react";
import { toast } from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If you have an API endpoint, send data to backend
      // await api.post("/api/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300">
            Have a question or feedback? We’d love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-8">
              Our team is always ready to help. Reach out via email, phone, or
              drop us a message using the form.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <MapPinIcon className="h-6 w-6 text-primary-600 mr-4" />
                <span className="text-gray-700">
                  TShirtStore HQ, Pune, India
                </span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-6 w-6 text-primary-600 mr-4" />
                <span className="text-gray-700">+91 1234 5678</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="h-6 w-6 text-primary-600 mr-4" />
                <span className="text-gray-700">support@tshirtstore.com</span>
              </div>
            </div>

            <div className="mt-8">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.780883414631!2d73.856743!3d18.520430!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06b9b44d1ff%3A0x33df98f9df3e95d0!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-64 rounded-xl border border-gray-300"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-black border-2 border-black font-semibold py-3 rounded-lg shadow-md transition-all flex items-center justify-center"
              >
                {loading ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    <SendIcon className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
