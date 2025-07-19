import React from "react";
import "./Booking_Page.css";

const BookingPage = () => {
    return (
        <div className="booking-container">
            <div className="booking-card">
                <div className="icon-wrapper">
                    <div className="checkmark-circle">
                        <svg
                            className="checkmark-icon"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>
                <h1 className="title">Congratulations!</h1>
                <p className="subtitle">Thank you for using StayWise.</p>
                <p className="message">
                    Your booking is confirmed. A confirmation email has been sent to your inbox with all the details.
                </p>
                <a href="/home" className="home-button">Back to Home</a>
            </div>
        </div>
    );
};

export default BookingPage;
