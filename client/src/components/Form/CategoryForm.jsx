import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center gap-3">
      <input
        type="text"
        placeholder="Enter new category"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-12 w-64 rounded-xl px-4 text-sm transition-all duration-200 placeholder:text-sm focus:outline-none"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid var(--border-default)",
          color: "var(--foreground)",
        }}
      />
      <button
        type="submit"
        className="rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
        style={{
          background: "var(--accent)",
          color: "#fff",
          boxShadow: "0 0 0 1px rgba(94,106,210,0.5), inset 0 1px 0 0 rgba(255,255,255,0.2)",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
