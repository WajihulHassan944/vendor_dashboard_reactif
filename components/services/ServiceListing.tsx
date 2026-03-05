"use client";

import React from "react";
import ServiceCard from "../cards/ServiceCard";

const ServiceListing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <ServiceCard
        category="Marketing"
        title="Content Strategy Development"
        description="Crafting a comprehensive content strategy tailored to your business goals, ensuring alignment with your target audience and market trends."
        duration="2–3 weeks"
        price="$1200.00"
      />

      <ServiceCard
        category="Development"
        title="Next.js Website Development"
        description="Full responsive website built with modern technologies and optimized for performance."
        duration="1–2 weeks"
        price="$1500.00"
      />

      <ServiceCard
        category="Design"
        title="UI/UX Product Design"
        description="Modern UI/UX design for SaaS and startup products focused on user experience."
        duration="1 week"
        price="$900.00"
      />

    </div>
  );
};

export default ServiceListing;