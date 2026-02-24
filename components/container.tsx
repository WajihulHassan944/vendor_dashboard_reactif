"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  const pathname = usePathname();

  // Pages where padding should be removed
  const noPaddingPages = ["/register", "/login", "/forgot-password"];
  const hidePadding = pathname.startsWith("/support") || noPaddingPages.includes(pathname);

  return (
    <div
      className={`
        w-full
        ${hidePadding ? "p-0" : "p-3"}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;