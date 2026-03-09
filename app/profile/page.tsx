"use client";

import Link from "next/link";
import { User, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/constants";

const Page = () => {
  const router = useRouter();
const fileInputRef = useRef<HTMLInputElement | null>(null);

const [preview, setPreview] = useState<string>("");
const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    companyName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // ✅ Load user from localStorage
useEffect(() => {
  const fetchUserDetail = async () => {
    const token = localStorage.getItem("sessionToken");

    if (!token) {
      toast.error("Session expired. Please login again.");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/user-detail`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("sessionToken");
          localStorage.removeItem("current_user");
          toast.error("Session expired. Please login again.");
          router.push("/login");
          return;
        }

        throw new Error(result?.message || "Failed to load profile.");
      }

      const backendUser = result?.data;

      const storedUser = JSON.parse(localStorage.getItem("current_user") || "{}");

      const mergedUser = {
        name: backendUser.name,
        phone: backendUser.contact_number,
        email: backendUser.email,
        avatar: backendUser.profile_image,
        address: backendUser.address,
        companyName: backendUser.company_name,
        city: backendUser.city,
        postalCode: backendUser.postal_code,
      };

      localStorage.setItem(
        "current_user",
        JSON.stringify({
          ...storedUser,
          ...mergedUser,
        })
      );

      setFormData({
        name: mergedUser.name || "",
        phone: mergedUser.phone || "",
        email: mergedUser.email || "",
        companyName: mergedUser.companyName || "",
        address: mergedUser.address || "",
        city: mergedUser.city || "",
        postalCode: mergedUser.postalCode || "",
      });

      setPreview(mergedUser.avatar || "");

    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  fetchUserDetail();
}, []);
const handleAvatarClick = () => {
  fileInputRef.current?.click();
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setAvatarFile(file);
  setPreview(URL.createObjectURL(file));
};
  // ✅ handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ submit
  const handleSubmit = async () => {
    const token = localStorage.getItem("sessionToken");

    if (!token) {
      toast.error("Session expired. Please login again.");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
const body = new FormData();

Object.entries(formData).forEach(([key, value]) => {
  body.append(key, value);
});

if (avatarFile) {
  body.append("profile_image", avatarFile);
}

      const response = await fetch(`${API_BASE_URL}/update-profile`, {
        method: "POST",
       headers: {
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
},
body,
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("sessionToken");
          localStorage.removeItem("current_user");
          toast.error("Session expired. Please login again.");
          router.push("/login");
          return;
        }

        throw new Error(result.message || "Failed to update profile");
      }

      // ✅ update localStorage
      const storedUser = JSON.parse(
        localStorage.getItem("current_user") || "{}"
      );

      const updatedUser = {
        ...storedUser,
        ...formData,
      };

      localStorage.setItem("current_user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
         <div
  onClick={handleAvatarClick}
  className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold cursor-pointer"
>
  {preview ? (
    <img src={preview} className="w-full h-full object-cover" />
  ) : (
    formData.name?.charAt(0) || "A"
  )}
</div>

<input
  type="file"
  accept="image/png, image/jpeg"
  ref={fileInputRef}
  onChange={handleFileChange}
  className="hidden"
/>

          <div>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-sm text-gray-400">Manage your Profile</p>
          </div>
        </div>

        <Link
          href="/services/add"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition px-5 py-2 rounded-lg text-sm font-medium"
        >
          + Add Service
        </Link>
      </div>

      {/* Card */}
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Smith"
                  className="profile-input"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 3xxxxxxxxx"
                  className="profile-input"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="profile-input"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Shop no, Street no, Region"
                  className="profile-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter City Name"
                    className="profile-input"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Enter Postal Code"
                    className="profile-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-[47.8%] bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition py-3 rounded-lg font-medium"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .profile-input {
          width: 100%;
          margin-top: 6px;
          padding: 10px 12px;
          border-radius: 8px;
          background: #020617;
          border: 1px solid rgba(255, 255, 255, 0.08);
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

export default Page;