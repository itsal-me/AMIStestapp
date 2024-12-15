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

    // Function to refresh the access token
    const refreshToken = async () => {
        try {
            const refresh = localStorage.getItem("refreshToken");
            if (!refresh) return false;

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

            if (response.ok) {
                localStorage.setItem("token", data.access);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Token refresh failed:", error);
            return false;
        }
    };

    // Function to check user's authentication status
    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            setLoading(false);
            return false;
        }

        try {
            const response = await fetch("http://localhost:8000/api/user/", {
                headers: getAuthHeaders(),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                return true;
            }

            // If token is expired, try to refresh
            const refreshed = await refreshToken();
            if (refreshed) {
                // Retry the request with new token
                const retryResponse = await fetch(
                    "http://localhost:8000/api/user/",
                    {
                        headers: getAuthHeaders(),
                    }
                );
                if (retryResponse.ok) {
                    const data = await retryResponse.json();
                    setUser(data);
                    return true;
                }
            }

            // If refresh failed, clear everything
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            return false;
        } catch (error) {
            console.error("Auth check failed:", error);
            setUser(null);
            return false;
        }
    }, []); // Empty dependency array since it doesn't depend on any state/props

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

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem("token", data.access);
                localStorage.setItem("refreshToken", data.refresh);
                return { success: true, user: data.user };
            }
            return { success: false, error: data.error };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: "Network error" };
        }
    };

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                await fetch("http://localhost:8000/api/logout/", {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify({
                        refresh_token: refreshToken,
                    }),
                });
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        }
    };

    // Initial auth check and token refresh setup
    useEffect(() => {
        const initAuth = async () => {
            setLoading(true);
            await checkAuth();
            setLoading(false);
        };

        initAuth();

        // Set up token refresh interval
        const refreshInterval = setInterval(refreshToken, 4 * 60 * 1000); // Refresh every 4 minutes

        return () => clearInterval(refreshInterval);
    }, [checkAuth]); // Only depend on checkAuth which is memoized

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
