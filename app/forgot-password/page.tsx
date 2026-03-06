"use client";

import { API_BASE_URL } from "@/lib/constants";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<"email" | "reset">("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  /* -------------------------
     Countdown Timer
  ------------------------- */
  useEffect(() => {
    if (step !== "reset") return;

    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, step]);

  /* -------------------------
     Validation
  ------------------------- */
  const validateEmail = () => {
    if (!email.trim()) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format.";
    return null;
  };

  const validateReset = () => {
    if (!otp.trim()) return "Please enter the OTP.";
    if (!/^\d{5}$/.test(otp)) return "OTP must be exactly 5 digits.";

    if (!newPassword.trim()) return "New password is required.";
    if (newPassword.length < 8)
      return "Password must be at least 8 characters.";

    return null;
  };

  /* -------------------------
     Send OTP
  ------------------------- */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateEmail();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email , user_type:"designer" }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404)
          throw new Error("No account found with this email.");
        throw new Error(data?.message || "Failed to send OTP.");
      }

      toast.success("OTP sent to your email.");

      setStep("reset");
      setCountdown(60);
      setCanResend(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------
     Reset Password
  ------------------------- */
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateReset();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword, user_type:"designer" }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) throw new Error("Incorrect OTP.");
        if (response.status === 410) throw new Error("OTP expired.");
        throw new Error(data?.message || "Reset failed.");
      }

      toast.success("Password reset successfully!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------
     Resend OTP
  ------------------------- */
  const handleResend = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, user_type:"designer" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to resend OTP.");
      }

      toast.success("A new OTP has been sent.");
      setCountdown(60);
      setCanResend(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------
     UI
  ------------------------- */
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row">
      {/* Left Image */}
      <div className="hidden md:flex md:flex-1">
        <img
          src="/login.png"
          alt="Forgot Password Illustration"
          className="object-cover w-full h-[100vh] rounded-tr-3xl rounded-br-3xl"
        />
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full p-6 md:p-12 flex flex-col gap-8">

          {/* Header */}
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-400">
              {step === "email" ? "Forgot Password" : "Reset Password"}
            </h1>

            <p className="text-neutral-50/60 max-w-[400px] mx-auto">
              {step === "email"
                ? "Enter your email and we will send you an OTP."
                : `Enter the 5-digit OTP sent to ${email}`}
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={step === "email" ? handleSendOtp : handleResetPassword}
            className="flex flex-col gap-6"
          >
            {/* Email Step */}
            {step === "email" && (
              <div className="flex flex-col gap-2">
                <label className="text-xl font-semibold text-neutral-50">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60"
                />
              </div>
            )}

            {/* Reset Step */}
            {step === "reset" && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-xl font-semibold text-neutral-50">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 5 digit OTP"
                    className="p-3 text-center tracking-[0.4em] rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xl font-semibold text-neutral-50">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50"
                  />
                </div>

                <div className="text-center text-sm text-neutral-50/60">
                  {!canResend ? (
                    <p>
                      Resend OTP in{" "}
                      <span className="text-neutral-50">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-blue-600 hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-indigo-400 to-slate-300 text-white font-semibold text-xl py-3 rounded-md"
            >
              {loading
                ? "Please wait..."
                : step === "email"
                ? "Send OTP"
                : "Reset Password"}
            </button>

            {/* Back */}
            <p className="text-neutral-50/60 text-base font-semibold text-center">
              Back to{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;