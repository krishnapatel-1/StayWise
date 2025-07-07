import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './customerSignUp.css';

export function CustomerSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        email: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.role === "") {
            alert("Please select your identity (Customer or Owner).");
            return;
        }

        try {
            const res = await fetch(`http://localhost:4000/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    mobile: formData.mobile, 
                    role: formData.role
                }),
                credentials: 'include'
            });

            const data = await res.json();
            console.log("📦 Backend response:", data);

            if (res.ok && data.user) {
                alert(data.message);

                localStorage.setItem('user', JSON.stringify(data.user));

                if (data.user.role === 'customer') {
                    localStorage.setItem('customerId', data.user._id);
                    navigate('/home');
                } else {
                    localStorage.setItem('ownerId', data.user._id);
                    navigate('/owner');
                }

            } else {
                alert(data.message || "Signup failed.");
            }

        } catch (error) {
            console.error("Signup error:", error);
            alert("Something went wrong. Please try again.");
        }
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
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Your Identity</option>
                        <option value="customer">Customer</option>
                        <option value="owner">Owner</option>
                    </select>
                    <div className="button-group">
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
