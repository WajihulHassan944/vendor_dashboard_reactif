"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/constants";

export interface User {
  userId: number;
  email: string;
  displayName: string;
  isVerified: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem("sessionToken");
      const storedUser = localStorage.getItem("current_user");

      if (!token || !storedUser) {
        setLoading(false);
         setUser(null);
          router.push("/login");
        return;
      }

      try {
        const parsedUser: User = JSON.parse(storedUser);

        const res = await fetch(`${API_BASE_URL}/auth/validate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
console.log(res);
        if (res.status === 401) {
          localStorage.removeItem("sessionToken");
          localStorage.removeItem("current_user");
          setUser(null);
          router.push("/login");
          setLoading(false);
          return;
        }

        if (!parsedUser.isVerified) {
          router.push("/register/enter-otp");
          setLoading(false);
          return;
        }

        setUser(parsedUser);
      } catch (error) {
        console.error("Auth validation error:", error);
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [router]);

  const logout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("current_user");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return { user, loading, logout };
};