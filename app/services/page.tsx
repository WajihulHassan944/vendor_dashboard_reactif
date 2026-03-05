"use client";
import ServiceListing from "@/components/services/ServiceListing";
import Header from "@/components/shared/Header";
import {  Plus } from "lucide-react";
import Link from "next/link";

export default function EarningsPage() {
  return (
    <section className="relative min-h-screen px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <Header
            title="Add New Service Listing"
            subtitle="Define your service details, pricing, and showcase your work to get more orders."
          />

 
  <Link href="/services/add" className="h-10 px-4 rounded-md bg-indigo-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-indigo-500 transition">
    <Plus className="w-4 h-4 text-white" />
    Add Service
  </Link>
        </div>

<ServiceListing />
      

      </div>
    </section>
  );
}