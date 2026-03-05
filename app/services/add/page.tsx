"use client";
import AddService from "@/components/forms/AddServicesForm";
import Header from "@/components/shared/Header";

export default function EarningsPage() {
  return (
    <section className="relative min-h-screen px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">

          <Header
            title="Add New Service Listing"
            subtitle="Define your service details, pricing, and showcase your work to get more orders."
          />
            <AddService />
      

      </div>
    </section>
  );
}