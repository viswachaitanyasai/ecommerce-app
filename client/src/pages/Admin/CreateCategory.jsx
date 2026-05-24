import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import AdminDashboard from "./AdminDashboard";

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

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        notify(`${data.category.name} is created`);
        getAllCategory();
        setName("");
      } else {
        notifyError("Error in input");
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong in input form");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        notify(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        notifyError(data.message);
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        notify("Category is deleted");
        getAllCategory();
      } else {
        notifyError(data.message);
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  return (
    <AdminDashboard>
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="label">Admin</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Manage Categories
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
            Create, edit, or remove product categories
          </p>
        </div>

        {/* Create form */}
        <div className="mb-8">
          <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
        </div>

        {/* Categories table */}
        {categories.length > 0 ? (
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border-default)",
            }}
          >
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--border-default)",
                  }}
                >
                  <th className="px-5 py-4 text-left text-sm font-medium" style={{ color: "var(--foreground-muted)" }}>
                    Name
                  </th>
                  <th className="px-5 py-4 text-right text-sm font-medium" style={{ color: "var(--foreground-muted)" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr
                    key={c._id}
                    style={{ borderBottom: "1px solid var(--border-default)" }}
                    className="transition-colors duration-200 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4 text-sm" style={{ color: "var(--foreground)" }}>
                      {c.name}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                          className="rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 hover:bg-white/[0.06]"
                          style={{
                            color: "var(--foreground)",
                            border: "1px solid var(--border-default)",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200"
                          style={{
                            color: "#ef4444",
                            border: "1px solid rgba(239,68,68,0.3)",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-default)" }}
            >
              <svg className="h-6 w-6" style={{ color: "var(--foreground-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>No categories yet</p>
          </div>
        )}
      </div>

      {/* ========== EDIT MODAL ========== */}
      {visible && (
        <>
          <div
            className="fixed inset-0 z-40 transition-opacity duration-300"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setVisible(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-md overflow-hidden rounded-2xl p-6 shadow-xl backdrop-blur-xl"
              style={{
                background: "var(--background-elevated)",
                border: "1px solid var(--border-default)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.6)",
              }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Edit Category</h3>
                <button
                  onClick={() => setVisible(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-white/[0.06]"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} />
            </div>
          </div>
        </>
      )}
    </AdminDashboard>
  );
};

export default CreateCategory;
