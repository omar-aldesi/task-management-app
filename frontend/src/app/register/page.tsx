"use client";

import CustomInput from "@/components/auth/CustomInput";
import { useApi } from "@/hooks/useApi";
import { auth } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { call, loading, error } = useApi();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Login attempt:", formData);
      const result = await call(() =>
        auth.register(formData.name, formData.email, formData.password)
      );
      if (result) {
        // Save token and user
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">
              Start Your Journey Today
            </h1>
            <p className="mt-2 text-secondary">
              Create your account to get started
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
                label="Name"
                htmlFor="name"
                id="name"
                name="name"
                type="text"
                required
                placeHolder="Enter your Name"
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
              {loading
                ? "Hold on a minute until we create your account"
                : "Register!"}
            </button>

            <div className="text-center">
              <p className="text-sm text-secondary">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary-hover))] font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
