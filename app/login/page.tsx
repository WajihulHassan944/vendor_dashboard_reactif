"use client";

import React from "react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row ">
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
        <div className="w-full  p-6 md:p-12 flex flex-col gap-8">
          {/* Header */}
          <div className="text-center md:text-left flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-400 text-center">
              Login Your Account
            </h1>
            <p className="text-neutral-50/60 font-semibold text-center">
              Join ReactIf Printing and Design Today
            </p>
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

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold text-neutral-50">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
              />

              {/* Forgot Password Link */}
              <div className="w-full flex justify-end mt-1">
                <Link
                  href="/forgot-password"
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* ReCAPTCHA / Remember Me */}
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
              Login
            </button>
            <p className="text-neutral-50/60 text-base font-semibold text-center w-full">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;