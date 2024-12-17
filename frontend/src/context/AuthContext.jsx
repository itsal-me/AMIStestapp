import {
    createContext,
    useState,
    useContext,
    useEffect,
    useCallback,
} from "react";
import { getAuthHeaders } from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshToken = async () => {
        try {
            const refresh = localStorage.getItem("refresh");
            if (!refresh) throw new Error("No refresh token");

            const response = await fetch(
                "http://localhost:8000/api/token/refresh/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refresh }),
                }
            );
            const data = await response.json();

            if (!response.ok) throw new Error(data.detail);

            localStorage.setItem("token", data.access);
            return data.access;
        } catch (err) {
            console.error("Token refresh failed:", err);
            logout();
            throw err;
        }
    };

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8000/api/user/", {
                headers: getAuthHeaders(),
            });

            if (response.status === 401) {
                // Token expired, try to refresh
                const newToken = await refreshToken();
                // Retry the request with new token
                const retryResponse = await fetch(
                    "http://localhost:8000/api/user/",
                    {
                        headers: {
                            ...getAuthHeaders(),
                            Authorization: `Bearer ${newToken}`,
                        },
                    }
                );
                if (!retryResponse.ok) throw new Error("Failed to fetch user");
                const userData = await retryResponse.json();
                setUser(userData);
                return;
            }

            if (!response.ok) throw new Error("Failed to fetch user");

            const data = await response.json();
            setUser(data);
        } catch (err) {
            console.error("Error fetching user:", err);
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [fetchUser]);

    const login = async (credentials) => {
        try {
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            localStorage.setItem("token", data.access);
            localStorage.setItem("refresh", data.refresh);
            setUser(data.user);
            return data.user;
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            const refresh = localStorage.getItem("refresh");
            if (refresh) {
                await fetch("http://localhost:8000/api/logout/", {
                    method: "POST",
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refresh_token: refresh }),
                });
            }
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
