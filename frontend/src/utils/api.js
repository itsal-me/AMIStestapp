// Create a new file for API utilities
export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
    };
};
