import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();
    const isLoading = user === undefined;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.user_type)) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;
