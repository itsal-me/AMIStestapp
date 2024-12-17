import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-light-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-primary-600 flex items-center"
                    >
                        AgriConnect
                    </Link>
                    <div className="flex items-center space-x-2">
                        {user ? (
                            <>
                                <Link
                                    to={`/${user.user_type.toLowerCase()}/dashboard`}
                                    className="nav-link"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="nav-link"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
