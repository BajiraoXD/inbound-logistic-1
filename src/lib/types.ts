export type Shipment = {
  id: string;
  trackingNumber: string;
  carrier: string;
  origin: string;
  destination: string;
  status: "In Transit" | "Delivered" | "Delayed" | "Pending";
  estimatedDelivery: string;
  actualDelivery?: string;
  supplierId: string;
  volume: number; // in units or cbm
  value: number; // in USD
};

export type Supplier = {
  id: string;
  name: string;
  onTimeRate: number;
  averageDelay: string;
  totalShipments: number;
};

export type AppNotification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
};
