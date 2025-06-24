import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './SignUp.css';

export function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('user', JSON.stringify(formData));

    navigate('/decision');
};

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="signup-container">
            <div className="left-panel">
                <img src="/logo.png" alt="Stay Wise Logo" className="logo" />
                <h2 className="company-name">Stay Wise</h2>
            </div>
            <div className="right-panel">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit} className="signup-form">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div className="button-group">
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
