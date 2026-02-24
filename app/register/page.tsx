"use client";

import Link from "next/link";
import React from "react";

const RegisterPage = () => {
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
        <div className="w-full  p-6 md:p-12 flex flex-col gap-8">
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
                type="email"
                placeholder="Enter Your Email"
                className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
              />
            </div>

            {/* Password & Confirm Password */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xl font-semibold text-neutral-50">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xl font-semibold text-neutral-50">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Confirm Password"
                  className="p-3 rounded-md outline outline-1 outline-neutral-50/30 bg-transparent text-neutral-50 placeholder:text-neutral-50/60 w-full"
                />
              </div>
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
              Register
            </button>
            <p className="text-neutral-50/60 text-base font-semibold text-center w-full">
              Already Have an Account?{" "}
              <Link href="/login" className="text-blue-600">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;