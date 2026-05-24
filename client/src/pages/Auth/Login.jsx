import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        notify(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        notifyError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  const handleGuest = () => {
    setEmail("guest@guest.com");
    setPassword("123456789");
  };

  return (
    <Layout>
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <span className="label">Auth</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl p-6 md:p-8"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              border: "1px solid var(--border-default)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            <div className="space-y-4">
              <div>
                <p className="mb-1.5 text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>Email</p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 w-full rounded-xl px-4 text-sm transition-all duration-200 placeholder:text-sm focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--border-default)",
                    color: "var(--foreground)",
                  }}
                />
              </div>
              <div>
                <p className="mb-1.5 text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>Password</p>
                <input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
              Sign In
            </button>

            {/* Guest button */}
            <button
              type="button"
              onClick={handleGuest}
              className="w-full rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 hover:opacity-80 active:scale-[0.97]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border-default)",
                color: "var(--foreground)",
              }}
            >
              Continue as Guest
            </button>

            {/* Links */}
            <div className="flex flex-col items-center gap-2 pt-2">
              <Link
                to="/register"
                className="text-sm no-underline transition-all duration-200 hover:opacity-80"
                style={{ color: "var(--accent)" }}
              >
                Create an account
              </Link>
              <Link
                to="/forgot-password"
                className="text-sm no-underline transition-all duration-200 hover:opacity-80"
                style={{ color: "var(--foreground-muted)" }}
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
