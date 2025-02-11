import { useState } from "react";
import "./Contact.css";

function Contact() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [msg,setMsg]=useState("");
    const [details,setDetails]=useState([]);
    const [isSubmitted,setIsSubmitted]=useState(false);

    const nameHandler=(e)=>{
        setName(e.target.value);
    } 
    const emailHandler = (e) => {
        setEmail(e.target.value);
    } 
    const msgHandler = (e) => {
        setMsg(e.target.value);
    } 

    const submitHandler=(e)=>{
        e.preventDefault();
        const detailsObj={
            name:name,
            email:email,
            msg:msg
        }
        setDetails([detailsObj,...details]);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000); // Hide the message after 3 seconds
        setName("");
        setEmail("");
        setMsg("");
        console.log(details);

    }

    return (
        <>
            <div className="contact-container">
                <h2>Contact Us</h2>
                <form className="contact-form" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            value={name}
                            onChange={nameHandler}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={emailHandler}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            value={msg}
                            onChange={msgHandler}
                            id="message"
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">
                        Send Message
                    </button>
                </form>
                {isSubmitted && (
                    <div className="success-message">
                        Your data has been sent successfully!
                    </div>
                )}
            </div>
        </>
    )
}
export default Contact;
