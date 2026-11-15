import { useState } from "react";

function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <p>If you have any questions, please feel free to contact us.</p>
            <form onSubmit={handleSubmit} className="contact-form">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="5"
                        required
                    />
                    <button type="submit">Send Message</button>
            </form>

            {submitted && (
                    <p role="alert">Thank you for your message, {name}! We will get back to you at {email} as soon as possible.</p>
            )}
        </div>
    );
}
            
export default ContactPage;