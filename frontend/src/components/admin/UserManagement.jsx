import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/users/", {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error("Failed to fetch users");
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError("Failed to fetch users");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/users/${userId}/`,
                {
                    method: "PATCH",
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_type: newRole }),
                }
            );
            if (!response.ok) throw new Error("Failed to update user role");

            setUsers(
                users.map((user) =>
                    user.id === userId ? { ...user, user_type: newRole } : user
                )
            );
        } catch (err) {
            setError("Failed to update user role");
            console.error(err);
        }
    };

    const handleStatusChange = async (userId, isActive) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/users/${userId}/`,
                {
                    method: "PATCH",
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ is_active: isActive }),
                }
            );
            if (!response.ok) throw new Error("Failed to update user status");

            setUsers(
                users.map((user) =>
                    user.id === userId ? { ...user, is_active: isActive } : user
                )
            );
        } catch (err) {
            setError("Failed to update user status");
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-light-200">
                            <th className="px-4 py-3 text-left">Username</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-light-300">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-light-100">
                                <td className="px-4 py-3">{user.username}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">
                                    <select
                                        className="input-field text-sm py-1"
                                        value={user.user_type}
                                        onChange={(e) =>
                                            handleRoleChange(
                                                user.id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="FARMER">Farmer</option>
                                        <option value="TRADER">Trader</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            user.is_active
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {user.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() =>
                                            handleStatusChange(
                                                user.id,
                                                !user.is_active
                                            )
                                        }
                                        className={`text-sm px-3 py-1 rounded-lg ${
                                            user.is_active
                                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                                : "bg-green-50 text-green-600 hover:bg-green-100"
                                        }`}
                                    >
                                        {user.is_active
                                            ? "Deactivate"
                                            : "Activate"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserManagement;
