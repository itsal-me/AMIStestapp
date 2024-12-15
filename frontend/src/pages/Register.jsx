import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        user_type: "FARMER",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:8000/api/register/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();

            if (response.ok) {
                navigate("/login");
            } else {
                setError(data.error || data.detail || "Registration failed");
                console.error("Registration error:", data);
            }
        } catch (error) {
            console.error("Network error:", error);
            setError("Network error. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto px-6 py-16">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold heading-gradient mb-3">
                    Create Account
                </h1>
                <p className="text-light-700">
                    Join our platform and start trading efficiently
                </p>
            </div>

            <div className="card p-8">
                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-light-800 font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                            className="input-field"
                            placeholder="Choose a username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-light-800 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="input-field"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-light-800 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="input-field"
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-light-800 font-medium mb-2">
                            User Type
                        </label>
                        <select
                            value={formData.user_type}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    user_type: e.target.value,
                                })
                            }
                            className="input-field"
                        >
                            <option value="FARMER">Farmer</option>
                            <option value="TRADER">Trader</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-light-700">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
