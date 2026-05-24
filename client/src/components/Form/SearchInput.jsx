import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative">
        <input
          type="search"
          placeholder="Search..."
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          className="h-9 w-36 rounded-xl pl-3 pr-8 text-sm transition-all duration-200 placeholder:text-sm focus:w-44 focus:outline-none md:w-40 md:focus:w-48"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid var(--border-default)",
            color: "var(--foreground)",
          }}
        />
        <svg
          className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
          style={{ color: "var(--foreground-muted)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button
        type="submit"
        className="hidden h-9 items-center justify-center rounded-xl px-3 text-sm font-medium transition-all duration-200 hover:opacity-90 md:flex"
        style={{
          background: "var(--accent)",
          color: "#fff",
          boxShadow: "0 0 0 1px rgba(94,106,210,0.5), inset 0 1px 0 0 rgba(255,255,255,0.2)",
        }}
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchInput;
