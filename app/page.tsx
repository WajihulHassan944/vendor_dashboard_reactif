import { OrderVolume } from "@/components/cards/OrderVolume";
import { RecentActivity } from "@/components/cards/RecentActivity";
import Dashboard from "@/components/dashboard/DashboardStats";
import Header from "@/components/shared/Header";

const page = () => {
  return (
    <section className="relative min-h-screen px-4 sm:px-6 lg:px-0">

      <Header
        title="Vender Dashboard"
        subtitle="Welcome to your Vender portal"
      />
      <div className="max-w-full mx-auto space-y-9 mt-9">

     <Dashboard />
<div className="grid gap-6 lg:grid-cols-[1.5fr_2.5fr]">
  <RecentActivity />
  <OrderVolume />
</div>


       

      </div>
    </section>
  );
};

export default page;
