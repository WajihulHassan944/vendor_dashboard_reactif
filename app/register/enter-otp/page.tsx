"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { API_BASE_URL } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import Link from "next/link"

const OTPForm = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  /* --------------------------
     Load stored user on mount
  -------------------------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("current_user")
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setEmail(parsed.email || "")
    }
  }, [])

  /* --------------------------
     Countdown Timer
  -------------------------- */
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true)
      return
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown])

  /* --------------------------
     Validation
  -------------------------- */
  const validateForm = () => {
    if (!otp.trim())
      return "Please enter the full verification code."

    if (!/^\d{5}$/.test(otp))
      return "OTP must be exactly 5 digits."

    return null
  }

  /* --------------------------
     Submit Handler
  -------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!navigator.onLine) {
      setError("No internet connection.")
      return
    }

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)

      const token = localStorage.getItem("sessionToken")
      if (!token) {
        throw new Error("Session expired. Please sign up again.")
      }

      const response = await fetch(
        `${API_BASE_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 400)
          throw new Error("Incorrect OTP.")

        if (response.status === 410)
          throw new Error("OTP expired. Request a new one.")

        if (response.status === 429)
          throw new Error("Too many attempts. Request a new OTP.")

        if (response.status === 422)
          throw new Error(data?.message || "Validation failed.")

        throw new Error("Verification failed. Try again.")
      }

      /* --------------------------
         SUCCESS PATH (C8.2)
      -------------------------- */

      const storedUser = localStorage.getItem("current_user")

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        parsedUser.isVerified = true
        localStorage.setItem("current_user", JSON.stringify(parsedUser))
      }

      setSuccess("Account verified successfully!")

      /* --------------------------
         Navigate to Home (C9)
      -------------------------- */
      setTimeout(() => {
        router.push("/")
      }, 1200)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* --------------------------
     Resend OTP (UI only trigger)
     Backend already sends on signup
  -------------------------- */
  /* --------------------------
   Resend OTP (backend integrated)
-------------------------- */

const handleResend = async () => {
  setError(null)
  setSuccess(null)

  if (!navigator.onLine) {
    setError("No internet connection.")
    return
  }

  try {
    setLoading(true)
    const response = await fetch(
      `${API_BASE_URL}/auth/resend-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 422)
        throw new Error(data?.message || "Validation failed.")

      throw new Error(data?.message || "Failed to resend OTP. Try again.")
    }

    // Success
    setSuccess("A new OTP has been sent to your email.")
    setCountdown(60)
    setCanResend(false)

  } catch (err: any) {
    setError(err.message)
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
        alt="Verify Illustration"
        className="object-cover w-full h-[100vh] rounded-tr-3xl rounded-br-3xl"
      />
    </div>

    {/* Right Form */}
    <div className="flex-1 flex items-center justify-center p-6 md:p-12">
      <div className="w-full p-6 md:p-12 flex flex-col gap-8">

        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-400">
            Verify Your Email
          </h1>
          <p className="text-neutral-50/60 font-semibold">
            Enter the 5-digit verification code sent to
          </p>
          <p className="text-neutral-50 font-semibold">
            {email || "your email"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* OTP */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold text-neutral-50">
              Verification Code
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter 5 digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={5}
              className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 text-center tracking-[0.5em] text-lg w-full"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Success */}
          {success && (
            <p className="text-sm text-green-500">{success}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-br from-indigo-400 to-slate-300 text-white font-semibold text-xl py-3 rounded-md"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        {/* Resend */}
        <div className="text-center text-sm text-neutral-50/60 font-semibold">
          {!canResend ? (
            <p>
              Resend code in{" "}
              <span className="text-neutral-50">{countdown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={loading}
              className="text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Back */}
        <p className="text-neutral-50/60 text-base font-semibold text-center w-full">
          Back to{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Registration
          </Link>
        </p>

      </div>
    </div>
  </div>
);
}

export default OTPForm