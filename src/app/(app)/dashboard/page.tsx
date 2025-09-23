import ShipmentTracker from "@/components/dashboard/shipment-tracker";
import StatsCards from "@/components/dashboard/stats-cards";
import IncomingGoodsChart from "@/components/dashboard/incoming-goods-chart";
import RecentShipmentsTable from "@/components/dashboard/recent-shipments-table";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <StatsCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <IncomingGoodsChart />
        </div>
        <div className="lg:col-span-1">
          <ShipmentTracker />
        </div>
      </div>
      <RecentShipmentsTable />
    </div>
  );
}
