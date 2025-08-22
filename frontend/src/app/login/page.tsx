"use client";

import CustomInput from "@/components/auth/CustomInput";
import { useApi } from "@/hooks/useApi";
import { auth } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { call, loading, error } = useApi();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, [router]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Login attempt:", formData);
      const result = await call(() =>
        auth.login(formData.email, formData.password)
      );
      if (result) {
        // Save token and user
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">Welcome back</h1>
            <p className="mt-2 text-secondary">
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <CustomInput
                label="Email"
                htmlFor="email"
                id="email"
                name="email"
                type="email"
                required
                placeHolder="Enter your email"
                onChange={handleChange}
              />
              <CustomInput
                label="Password"
                htmlFor="password"
                id="password"
                name="password"
                required
                type="password"
                defaultValue={formData.password}
                onChange={handleChange}
                placeHolder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="text-center">
              <p className="text-sm text-secondary">
                Don't have an account?
                <Link
                  href="/register"
                  className="text-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary-hover))] font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
