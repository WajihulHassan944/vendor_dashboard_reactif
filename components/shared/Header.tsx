"use client";

import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode; // optional element to render on the right
}

const Header = ({ title, subtitle, action }: HeaderProps) => {
  return (
    <div className="max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white font-hk">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[#FAFAFA99] text-[19px]  font-medium font-hk mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {/* Optional action element */}
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};

export default Header;
