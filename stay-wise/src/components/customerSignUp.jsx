import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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

  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  const inputRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      alert("Please enter an email to receive OTP.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          userName: formData.fullName,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("OTP sent to your email.");
        setOtpSent(true);
        setTimer(60);
        setOtpDigits(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("OTP Send Error:", err);
      alert("Could not send OTP.");
    }
  };

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOTPChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length !== 6) {
      alert("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: enteredOtp }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("✅ Email verified successfully!");
        setVerified(true);
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP Verify Error:", err);
      alert("OTP verification failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.role === "") {
      alert("Please select your identity (Customer or Owner).");
      return;
    }

    if (!verified) {
      alert("Please verify your email before signing up.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      if (!res.ok) {
        alert(data.message || "Signup failed.");
        return;
      }

      if (data && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.role === 'customer') {
          localStorage.setItem('customerId', data.user._id);
          navigate('/home');
        } else {
          localStorage.setItem('ownerId', data.user._id);
          navigate('/owner');
        }
        alert("Signup successful!");
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

          <div className="email-otp-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={timer > 0}
            >
              {timer > 0 ? `Resend in ${timer}s` : "Send OTP"}
            </button>
          </div>

          {otpSent && (
            <div className="otp-verification">
              <div className="otp-boxes">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOTPChange(e.target.value, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
              <button type="button" onClick={handleVerifyOTP}>Verify OTP</button>
            </div>
          )}

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
