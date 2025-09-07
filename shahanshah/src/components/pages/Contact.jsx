import { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            console.log("Form submitted:", form);
            setStatus("Message sent successfully!");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            console.error(err);
            setStatus("Failed to send message. Try again.");
        }
    };

    return (
        <main className="min-h-[calc(100vh-64px)] px-6 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

            {/* Google Map Full Width */}
            <div className="w-full h-[300px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d285.37251056129725!2d80.9374259361171!3d26.859505962827804!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd9bc31ed365%3A0x3c4f237a66fb2b49!2spurana%20sankat%20mochan%20mandir!5e1!3m2!1sen!2sin!4v1757229604690!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Aashram Location"
                ></iframe>
            </div>

            {/* Location Note */}
            <p className="mt-3 text-sm text-gray-700 italic text-center">
                📍 <strong>Note:</strong> Our <strong>Shahanshahi Aashram</strong> is located just
                next to <strong>Purana Sankat Mochan Mandir</strong> shown on the map.
            </p>

            {/* Contact Form + Admin Info (stacked below map) */}
            <div className="mt-10 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Send us a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder="John Doe"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                            required
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Message
                        </label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={onChange}
                            placeholder="Write your message here..."
                            rows="4"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl px-4 py-3 shadow-md transition transform hover:scale-[1.02]"
                    >
                        Send Message
                    </button>
                </form>

                {status && (
                    <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
                )}

                {/* Admin Info */}
                {/* <div className="mt-8 border-t pt-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">
                        Administrator Contacts
                    </h2>
                    <ul className="text-sm text-gray-700 space-y-2">
                        <li>
                            <span className="font-semibold">Head:</span> Swami Ji —{" "}
                            <a href="tel:+919876543210" className="text-amber-600 hover:underline">
                                +91 98765 43210
                            </a>
                        </li>
                        <li>
                            <span className="font-semibold">Coordinator:</span> Ankit Sharma —{" "}
                            <a href="tel:+919123456789" className="text-amber-600 hover:underline">
                                +91 91234 56789
                            </a>
                        </li>
                        <li>
                            <span className="font-semibold">Email:</span>{" "}
                            <a href="mailto:contact@aashram.org" className="text-amber-600 hover:underline">
                                contact@aashram.org
                            </a>
                        </li>
                    </ul>
                </div> */}
            </div>
        </main>
    );
}
