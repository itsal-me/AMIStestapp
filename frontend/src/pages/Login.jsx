import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const user = await login(credentials);
            if (user.user_type === "FARMER") {
                navigate("/farmer/dashboard");
            } else if (user.user_type === "TRADER") {
                navigate("/trader/dashboard");
            } else if (user.user_type === "ADMIN") {
                navigate("/admin/dashboard");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto px-6 py-16">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold heading-gradient mb-3">
                    Welcome Back
                </h1>
                <p className="text-light-700">
                    Enter your credentials to access your account
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
                            value={credentials.username}
                            onChange={(e) =>
                                setCredentials({
                                    ...credentials,
                                    username: e.target.value,
                                })
                            }
                            className="input-field"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-light-800 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({
                                    ...credentials,
                                    password: e.target.value,
                                })
                            }
                            className="input-field"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-light-700">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
