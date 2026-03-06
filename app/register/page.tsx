"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/constants";

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full Name is required.";

    if (!formData.email.trim()) return "Email is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Invalid email format.";

    if (!formData.phone.trim()) return "Phone number is required.";

    if (!formData.password) return "Password is required.";

    if (formData.password.length < 8)
      return "Password must be at least 8 characters.";

    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match.";

    return null;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (loading) return;

  setError(null);

  /* INTERNET CHECK */
  if (!navigator.onLine) {
    const msg = "No internet connection.";
    setError(msg);
    toast.error(msg);
    return;
  }

  /* FORM VALIDATION */
  const validationError = validateForm();
  if (validationError) {
    setError(validationError);
    toast.error(validationError);
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        user_type: "designer",
      }),
    });

    const data = await response.json();

    /* ERROR HANDLING */
    if (!response.ok) {
      let errorMessage = "Something went wrong.";

      if (response.status === 409) {
        errorMessage =
          data?.message || "An account with this email already exists.";
      }

      if (response.status === 422) {
        if (data?.errors) {
          const fieldErrors = Object.values(data.errors);
          if (fieldErrors.length > 0 && Array.isArray(fieldErrors[0])) {
            errorMessage = fieldErrors[0][0];
          }
        } else {
          errorMessage = data?.message || "Validation failed.";
        }
      }

      if (response.status === 500) {
        errorMessage =
          data?.message || "Account creation failed. Please try again.";
      }

      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    /* SUCCESS */

    localStorage.setItem("sessionToken", data.sessionToken);

    const userObject = {
      userId: data.userId,
      email: data.email,
      displayName: data.displayName,
      isVerified: data.isVerified ?? false,
    };

    localStorage.setItem("current_user", JSON.stringify(userObject));

    toast.success("Account created successfully! OTP sent to your email.");

    setTimeout(() => {
      router.push("/register/enter-otp");
    }, 1200);

  } catch (err: any) {
    const message = err?.message || "Something went wrong.";
    setError(message);
    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-[rgba(0,0,0,0.2)]">
      {/* Left Image */}
      <div className="hidden md:flex md:flex-1">
        <img
          src="/login.png"
          alt="Register Illustration"
          className="object-cover w-full h-full rounded-tr-3xl rounded-br-3xl"
        />
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 md:p-12 flex flex-col gap-8"
        >
          {/* Header */}
          <div className="text-center md:text-left flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-400 text-center">
              Create New Account
            </h1>
            <p className="text-neutral-50/60 font-semibold text-center">
              Join ReactIf Printing and Design Today
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-6">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold text-neutral-50">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Enter Full Name"
                className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
              />
            </div>

            {/* Company & Phone */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xl font-semibold text-neutral-50">
                  Company Name
                </label>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Company Name"
                  className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xl font-semibold text-neutral-50">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Phone Number"
                  className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold text-neutral-50">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter Your Email"
                className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold text-neutral-50">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter Password"
                className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold text-neutral-50">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="Enter Confirm Password"
                className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-indigo-400 to-slate-300 text-white font-semibold text-xl py-3 rounded-md hover:opacity-90"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <p className="text-neutral-50/60 text-base font-semibold text-center w-full">
              Already Have an Account?{" "}
              <Link href="/login" className="text-blue-600">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;