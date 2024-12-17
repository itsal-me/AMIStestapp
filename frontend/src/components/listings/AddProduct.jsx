import { useState } from "react";
import { getAuthHeaders } from "../../utils/api";
import { formatCurrency } from "../../utils/formatters";

function AddProduct({ onSuccess }) {
    const [product, setProduct] = useState({
        commodity: "",
        quantity: "",
        price: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "http://localhost:8000/api/listings/",
                {
                    method: "POST",
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...product,
                        price: parseFloat(product.price),
                        quantity: parseFloat(product.quantity),
                    }),
                }
            );

            if (!response.ok) throw new Error("Failed to add product");

            setProduct({
                commodity: "",
                quantity: "",
                price: "",
                description: "",
            });
            onSuccess?.();
        } catch (err) {
            setError("Failed to add product. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-light-800 font-medium mb-2">
                    Commodity
                </label>
                <input
                    type="text"
                    className="input-field"
                    value={product.commodity}
                    onChange={(e) =>
                        setProduct({ ...product, commodity: e.target.value })
                    }
                    required
                />
            </div>

            <div>
                <label className="block text-light-800 font-medium mb-2">
                    Quantity (kg)
                </label>
                <input
                    type="number"
                    className="input-field"
                    min="0"
                    step="0.01"
                    value={product.quantity}
                    onChange={(e) =>
                        setProduct({ ...product, quantity: e.target.value })
                    }
                    required
                />
            </div>

            <div>
                <label className="block text-light-800 font-medium mb-2">
                    Price per kg (৳)
                </label>
                <input
                    type="number"
                    className="input-field"
                    min="0"
                    step="0.01"
                    value={product.price}
                    onChange={(e) =>
                        setProduct({ ...product, price: e.target.value })
                    }
                    required
                />
            </div>

            <div>
                <label className="block text-light-800 font-medium mb-2">
                    Description
                </label>
                <textarea
                    className="input-field"
                    rows="4"
                    value={product.description}
                    onChange={(e) =>
                        setProduct({ ...product, description: e.target.value })
                    }
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Product"}
            </button>
        </form>
    );
}

export default AddProduct;
