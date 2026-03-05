"use client";

import Link from "next/link";
import React from "react";
import { User, Briefcase } from "lucide-react";

const page = () => {
  return (
    <div className="relative min-h-screen text-white ">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        
        <div className="flex items-center gap-4">
          
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold">
            A
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-sm text-gray-400">Manage your Profile</p>
          </div>

        </div>

        <Link href="/services/add" className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition px-5 py-2 rounded-lg text-sm font-medium">
          + Add Service
        </Link>

      </div>


      {/* Card Container */}
      <div className="bg-[#0F172A] border border-white/10 rounded-xl p-6 md:p-8">

        <div className="grid md:grid-cols-2 gap-10">

          {/* Personal Info */}
          <div>
            <div className="bg-[#1E293B] rounded-md px-4 py-3 mb-6 text-sm font-semibold text-purple-400 flex items-center gap-2">
              <User size={16} />
              Personal Information
            </div>

            <div className="space-y-5">

              <div>
                <label className="text-sm text-gray-400">User Name</label>
                <input
                  type="text"
                  placeholder="Alex Smith"
                  className="profile-input"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Phone</label>
                <input
                  type="text"
                  placeholder="+92 3xxxxxxxxx"
                  className="profile-input"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  placeholder="reactif@gmail.com"
                  className="profile-input"
                />
              </div>

            </div>
          </div>


          {/* Business Info */}
          <div>

            <div className="bg-[#1E293B] rounded-md px-4 py-3 mb-6 text-sm font-semibold text-purple-400 flex items-center gap-2">
              <Briefcase size={16} />
              Business Information
            </div>

            <div className="space-y-5">

              <div>
                <label className="text-sm text-gray-400">Company Name</label>
                <input
                  type="text"
                  placeholder="Shop no, Street no, Region"
                  className="profile-input"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Address</label>
                <input
                  type="text"
                  placeholder="Shop no, Street no, Region"
                  className="profile-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm text-gray-400">City</label>
                  <input
                    type="text"
                    placeholder="Enter City Name"
                    className="profile-input"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Postal Code</label>
                  <input
                    type="text"
                    placeholder="Enter Postal Code"
                    className="profile-input"
                  />
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Save Button */}
        <div className="mt-10 flex justify-end">
          <button className="w-[47.8%] bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition py-3 rounded-lg font-medium">
            Save
          </button>
        </div>

      </div>


      {/* Reusable Styles */}
      <style jsx>{`
        .profile-input {
          width: 100%;
          margin-top: 6px;
          padding: 10px 12px;
          border-radius: 8px;
          background: #020617;
          border: 1px solid rgba(255,255,255,0.08);
          color: white;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
        }

        .profile-input::placeholder {
          color: #6b7280;
        }

        .profile-input:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 1px #8b5cf6;
        }
      `}</style>

    </div>
  );
};

export default page;