"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE_URL } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateForm = () => {
    if (!email.trim()) return "Email is required."
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Invalid email format."
    if (!password.trim()) return "Password is required."
    if (password.length < 8) return "Password must be at least 8 characters."
    return null
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!navigator.onLine) {
    toast.error("No internet connection.")
    return
  }

  const validationError = validateForm()
  if (validationError) {
    toast.error(validationError)
    return
  }

  try {
    setLoading(true)

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, user_type:"designer" }),
    })

    const data = await response.json()

    if (!response.ok) {
      let message = "Login failed. Try again."
      if (response.status === 401) message = "Invalid email or password."
      if (response.status === 422) message = data?.message || "Validation failed."

      toast.error(message)
      return
    }

    // Save session token
    if (data.sessionToken) localStorage.setItem("sessionToken", data.sessionToken)

    // Save user object
    const userObject = {
      userId: data.userId,
      email: data.email,
      displayName: data.displayName,
      isVerified: data.isVerified ?? false,
    }
    localStorage.setItem("current_user", JSON.stringify(userObject))

    // Success toast
    toast.success(userObject.isVerified ? "Login Successful!" : "Account created, please verify OTP!")

    // Redirect
    if (!userObject.isVerified) router.push("/register/enter-otp")
    else router.push("/")

  } catch (err: any) {
    toast.error(err.message || "Something went wrong. Try again.")
  } finally {
    setLoading(false)
  }
}
return (
  <div className="relative min-h-screen flex flex-col md:flex-row">
    {/* Left Image */}
    <div className="hidden md:flex md:flex-1">
      <img
        src="/login.png"
        alt="Login Illustration"
        className="object-cover w-full h-[100vh] rounded-tr-3xl rounded-br-3xl"
      />
    </div>

    {/* Right Form */}
    <div className="flex-1 flex items-center justify-center p-6 md:p-12">
      <div className="w-full p-6 md:p-12 flex flex-col gap-8">
        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-400">
            Login Your Account
          </h1>
          <p className="text-neutral-50/60 font-semibold">
            Join ReactIf Printing and Design Today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label className="text-xl font-semibold text-neutral-50">
              Email
            </Label>
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md border border-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label className="text-xl font-semibold text-neutral-50">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md border border-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
            />

            <div className="w-full flex justify-end mt-1">
              <Link
                href="/forgot-password"
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-br from-indigo-400 to-slate-300 text-white font-semibold text-xl py-3 rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup */}
          <p className="text-neutral-50/60 text-base font-semibold text-center w-full">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>

        {/* Footer */}
        <div className="text-center text-neutral-50/60 text-xs">
          © 2026 ReactIf Printing & Design. All rights reserved
        </div>
      </div>
    </div>
  </div>
)
};

export default LoginPage;