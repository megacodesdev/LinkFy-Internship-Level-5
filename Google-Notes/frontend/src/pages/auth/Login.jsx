import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            const res = await login(formData);

            if (!res.success) {
                setMessage(res.message || "Invalid credentials");
                return;
            }

            setMessage(res.message);
            navigate("/dashboard");

        } catch (err) {
            console.log("Error while processing login: ", err);
            setMessage("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">

            <div className="mb-6">
                <span className="text-3xl font-bold text-gray-800">
                    Login Form
                </span>
            </div>

            <form
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4"
                onSubmit={handleSubmit}
            >

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                />

                {message && (
                    <div className="text-center text-red-600 font-semibold">
                        {message}
                    </div>
                )}

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>

            <span className="mt-4 text-sm">
                No Account?
                <Link to="/" className="text-blue-600 ml-1">
                    Create Account
                </Link>
            </span>
        </div>
    );
}