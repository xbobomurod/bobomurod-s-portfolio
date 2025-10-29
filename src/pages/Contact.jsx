import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const botToken = '8441685341:AAFwsGYoXUjzLlsyC-MeWfZpPDtnbnYyQho'; // <-- o'zgartiring
    const chatId = '-1002558909944';     // <-- o'zgartiring

    const messageText = `
📩 New Contact Message:
👤 Name: ${formData.name}
📧 Email: ${formData.email}
📝 Message: ${formData.message}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
        }),
      });
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-[#0f111a] overflow-hidden pt-24 px-4">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)] bg-[size:30px_30px] pointer-events-none"></div>

      {/* Gradient Blobs */}
      <div className="absolute w-96 h-96 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 opacity-20 rounded-full blur-[120px] top-20 left-10 animate-blob pointer-events-none"></div>
      <div className="absolute w-96 h-96 bg-gradient-to-tr from-pink-400 via-red-500 to-yellow-500 opacity-20 rounded-full blur-[120px] bottom-20 right-10 animate-blob delay-500 pointer-events-none"></div>

      {/* Section Title */}
      <h2 className="text-gray-400 font-mono text-sm mb-6 w-full max-w-4xl">// Contact Me</h2>

      {/* Terminal-style Contact Form */}
      <div className="bg-[#1e1e2f] rounded-lg shadow-lg p-6 border border-white/10 text-gray-300 font-mono text-sm w-full max-w-2xl z-10">
        <p className="mb-2 text-green-400">&gt; Hello there!</p>
        <p className="mb-4">Drop your message below — I usually respond within 24–48 hours. Include any links or context that will help me assist you faster.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-400">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full px-3 py-2 bg-[#2c2c3a] border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-400">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2 bg-[#2c2c3a] border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-400">Message:</label>
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message..."
              className="w-full px-3 py-2 bg-[#2c2c3a] border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-white"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={sending}
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded transition"
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {success && <p className="mt-4 text-green-400">✅ Message sent successfully!</p>}

        <p className="mt-6 text-gray-500 text-xs">
          Or email me directly:{' '}
          <a href="xbobomurod50@gmail.com" className="text-blue-400 underline">
            xbobomruod50@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
