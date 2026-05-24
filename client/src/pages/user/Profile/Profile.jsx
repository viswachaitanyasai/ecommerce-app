import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layouts/Layout";
import UserMenu from "../../../components/UserMenu/UserMenu";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

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

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, phone, address } = auth?.user || {};
    setName(name || "");
    setEmail(email || "");
    setPhone(phone || "");
    setAddress(address || "");
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        notifyError(data.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        notify("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong!");
    }
  };

  return (
    <Layout>
      <section className="px-4 pt-28 pb-16 md:pt-32 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* User nav */}
          <div className="mb-10 flex justify-center">
            <UserMenu />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <span className="label">Profile</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Your Details
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
              Update your personal information
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-lg space-y-5 rounded-2xl p-6 md:p-8"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              border: "1px solid var(--border-default)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            <div className="space-y-4">
              {/* Name */}
              <div>
                <p className="mb-1.5 text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>Full Name</p>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 w-full rounded-xl px-4 text-sm transition-all duration-200 placeholder:text-sm focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--border-default)",
                    color: "var(--foreground)",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <p className="mb-1.5 text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>Email</p>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  className="h-12 w-full rounded-xl px-4 text-sm transition-all duration-200 placeholder:text-sm focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border-default)",
                    color: "var(--foreground-muted)",
                    opacity: 0.6,
                    cursor: "not-allowed",
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <p className="mb-1.5 text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>Password</p>
                <input
                  type="password"
                  placeholder="Leave blank to keep current"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-xl px-4 text-sm transition-all duration-200 placeholder:text-sm focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--border-default)",
                    color: "var(--foreground)",
                  }}
                />
              </div>

              {/* Phone */}
              <div>
                <p className="mb-1.5 text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>Phone Number</p>
                <input
                  type="text"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 w-full rounded-xl px-4 text-sm transition-all duration-200 placeholder:text-sm focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--border-default)",
                    color: "var(--foreground)",
                  }}
                />
              </div>

              {/* Address */}
              <div>
                <p className="mb-1.5 text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>Address</p>
                <input
                  type="text"
                  placeholder="Your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-12 w-full rounded-xl px-4 text-sm transition-all duration-200 placeholder:text-sm focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--border-default)",
                    color: "var(--foreground)",
                  }}
                />
              </div>
            </div>

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
              Update Profile
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
