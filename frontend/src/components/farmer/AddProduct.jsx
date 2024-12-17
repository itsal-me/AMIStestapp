import { useState } from "react";
import { getAuthHeaders } from "../../utils/api";
import { formatCurrency } from "../../utils/formatters";

function AddProduct() {
    const [product, setProduct] = useState({
        commodity: "",
        quantity: "",
        price: "",
        description: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

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

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to add product");
            }

            setSuccess(true);
            setProduct({
                commodity: "",
                quantity: "",
                price: "",
                description: "",
            });
        } catch (err) {
            setError(err.message || "Failed to add product");
            console.error(err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-6">
                    Product added successfully!
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-light-800 font-medium mb-2">
                        Commodity
                    </label>
                    <input
                        type="text"
                        className="input-field"
                        value={product.commodity}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                commodity: e.target.value,
                            })
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
                        step="0.01"
                        min="0"
                        className="input-field"
                        value={product.quantity}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                quantity: e.target.value,
                            })
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
                        step="0.01"
                        min="0"
                        className="input-field"
                        value={product.price}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                price: e.target.value,
                            })
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
                            setProduct({
                                ...product,
                                description: e.target.value,
                            })
                        }
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
