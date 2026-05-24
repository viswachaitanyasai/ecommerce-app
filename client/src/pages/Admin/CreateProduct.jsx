import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import SelectInput from "../../components/ui/SelectInput";

const notify = (msg) =>
  toast.success(msg, {
    style: { background: "#0a0a0c", color: "#ededef", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" },
    iconTheme: { primary: "#5E6AD2", secondary: "#ededef" },
  });

const notifyError = (msg) =>
  toast.error(msg, {
    style: { background: "#0a0a0c", color: "#ededef", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" },
    iconTheme: { primary: "#ef4444", secondary: "#ededef" },
  });

const SHIPPING_OPTIONS = [
  { value: "0", label: "No" },
  { value: "1", label: "Yes" },
];

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        notify("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        notifyError(data?.message);
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  const categoryOptions = categories.map((c) => ({ value: c._id, label: c.name }));

  return (
    <AdminDashboard>
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="label">Admin</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Create Product
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
            Add a new product to your store
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleCreate}
          className="space-y-5 rounded-2xl p-6 md:p-8"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid var(--border-default)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)",
          }}
        >
          {/* Category select */}
          <SelectInput
            value={category}
            onChange={setCategory}
            placeholder="Select a category"
            options={categoryOptions}
          />

          {/* Photo upload */}
          <div>
            {photo && (
              <div className="mb-3 overflow-hidden rounded-xl">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product preview"
                  className="h-40 w-full object-cover"
                />
              </div>
            )}
            <label
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border-default)",
                color: "var(--foreground)",
              }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {photo ? "Change Photo" : "Upload Photo"}
              <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
            </label>
          </div>

          {/* Text inputs */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 w-full rounded-xl px-4 text-sm transition-all duration-200 placeholder:text-sm focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border-default)",
                color: "var(--foreground)",
              }}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-12 w-full rounded-xl px-4 text-sm transition-all duration-200 placeholder:text-sm focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border-default)",
                color: "var(--foreground)",
              }}
            />
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-12 w-full rounded-xl px-4 text-sm transition-all duration-200 placeholder:text-sm focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--border-default)",
                  color: "var(--foreground)",
                }}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="h-12 w-full rounded-xl px-4 text-sm transition-all duration-200 placeholder:text-sm focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--border-default)",
                  color: "var(--foreground)",
                }}
              />
            </div>
          </div>

          {/* Shipping select */}
          <SelectInput
            value={shipping}
            onChange={setShipping}
            placeholder="Select shipping"
            options={SHIPPING_OPTIONS}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            style={{
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 0 0 1px rgba(94,106,210,0.5), inset 0 1px 0 0 rgba(255,255,255,0.2)",
            }}
          >
            Create Product
          </button>
        </form>
      </div>
    </AdminDashboard>
  );
};

export default CreateProduct;
