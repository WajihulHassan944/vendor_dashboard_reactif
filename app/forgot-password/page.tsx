"use client";

import Link from "next/link";

const ForgotPasswordPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row ">
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
        <div className="w-full  p-6 md:p-12 flex flex-col gap-8">
          {/* Header */}
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-400 text-center">
              Forgot Password
            </h1>
           <center> <p className="text-neutral-50/60  text-center max-w-[400px]">
              Enter your email below and we will send you a link to reset your password.
            </p></center>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold text-neutral-50">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
              />
            </div>

            {/* ReCAPTCHA */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 flex items-center justify-center bg-blue-600 rounded-sm" />
                <span className="text-neutral-50/60 text-base font-normal">
                  I am not a robot
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <button className="w-full bg-gradient-to-br from-indigo-400 to-slate-300 text-white font-semibold text-xl py-3 rounded-md">
              Send Reset Link
            </button>
            <p className="text-neutral-50/60 text-base font-semibold text-center w-full">
              Back to{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;