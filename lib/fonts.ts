import { Onest, Barlow, Poppins } from "next/font/google";

export const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const barlow = Barlow({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
});
