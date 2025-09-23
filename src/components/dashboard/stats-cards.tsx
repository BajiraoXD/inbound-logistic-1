import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_SHIPMENTS, MOCK_SUPPLIERS } from "@/lib/data";
import { DollarSign, Package, Timer } from "lucide-react";

export default function StatsCards() {
  const totalShipments = MOCK_SHIPMENTS.length;
  const onTimeShipments = MOCK_SHIPMENTS.filter(
    (s) => s.status !== "Delayed"
  ).length;
  const onTimeRate = Math.round((onTimeShipments / totalShipments) * 100);
  const totalValue = MOCK_SHIPMENTS.reduce((acc, s) => acc + s.value, 0);

  const stats = [
    {
      title: "Total Shipments",
      value: totalShipments,
      icon: Package,
      change: "+5.2% from last month",
    },
    {
      title: "On-Time Rate",
      value: `${onTimeRate}%`,
      icon: Timer,
      change: "-1.2% from last month",
      color: "text-accent-foreground",
    },
    {
      title: "Total Value",
      value: `$${(totalValue / 1000).toFixed(1)}k`,
      icon: DollarSign,
      change: "+10.1% from last month",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
