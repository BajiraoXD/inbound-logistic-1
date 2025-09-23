import {
  type Shipment,
  type Supplier,
  type AppNotification,
} from "@/lib/types";
import { subDays, format } from "date-fns";

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: "SUP001",
    name: "Global Tech Inc.",
    onTimeRate: 95,
    averageDelay: "0.5 days",
    totalShipments: 150,
  },
  {
    id: "SUP002",
    name: "Innovate Solutions",
    onTimeRate: 88,
    averageDelay: "1.2 days",
    totalShipments: 75,
  },
  {
    id: "SUP003",
    name: "Quantum Parts",
    onTimeRate: 98,
    averageDelay: "0.2 days",
    totalShipments: 230,
  },
  {
    id: "SUP004",
    name: "Starlight Components",
    onTimeRate: 91,
    averageDelay: "0.9 days",
    totalShipments: 110,
  },
  {
    id: "SUP005",
    name: "Evergreen Logistics",
    onTimeRate: 85,
    averageDelay: "2.1 days",
    totalShipments: 45,
  },
];

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: "SHP001",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    origin: "Shenzhen, CN",
    destination: "Los Angeles, USA",
    status: "In Transit",
    estimatedDelivery: format(new Date(), "yyyy-MM-dd"),
    supplierId: "SUP001",
    volume: 50,
    value: 25000,
  },
  {
    id: "SHP002",
    trackingNumber: "9405511899560346938999",
    carrier: "USPS",
    origin: "Frankfurt, DE",
    destination: "New York, USA",
    status: "Delayed",
    estimatedDelivery: format(subDays(new Date(), 2), "yyyy-MM-dd"),
    supplierId: "SUP002",
    volume: 20,
    value: 8000,
  },
  {
    id: "SHP003",
    trackingNumber: "783463342111",
    carrier: "FedEx",
    origin: "Taipei, TW",
    destination: "Chicago, USA",
    status: "Delivered",
    estimatedDelivery: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    actualDelivery: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    supplierId: "SUP003",
    volume: 120,
    value: 75000,
  },
  {
    id: "SHP004",
    trackingNumber: "DT1000101010Y",
    carrier: "DHL",
    origin: "Seoul, KR",
    destination: "Dallas, USA",
    status: "Pending",
    estimatedDelivery: format(subDays(new Date(), -3), "yyyy-MM-dd"),
    supplierId: "SUP004",
    volume: 75,
    value: 42000,
  },
  {
    id: "SHP005",
    trackingNumber: "1Z999AA101234569999",
    carrier: "UPS",
    origin: "Ho Chi Minh, VN",
    destination: "Miami, USA",
    status: "In Transit",
    estimatedDelivery: format(subDays(new Date(), -1), "yyyy-MM-dd"),
    supplierId: "SUP001",
    volume: 30,
    value: 15000,
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "NOTIF001",
    title: "Shipment Delayed",
    description:
      "Shipment #SHP002 from Innovate Solutions is delayed by 2 days.",
    timestamp: subDays(new Date(), 1).toISOString(),
    read: false,
  },
  {
    id: "NOTIF002",
    title: "Shipment Delivered",
    description: "Shipment #SHP003 from Quantum Parts has been delivered.",
    timestamp: subDays(new Date(), 5).toISOString(),
    read: true,
  },
  {
    id: "NOTIF003",
    title: "Low Stock Warning",
    description: "Inventory for product SKU-12345 is running low.",
    timestamp: new Date().toISOString(),
    read: false,
  },
];

export const MOCK_INCOMING_GOODS = [
  { date: format(subDays(new Date(), 6), "MMM d"), volume: 250, value: 120000 },
  { date: format(subDays(new Date(), 5), "MMM d"), volume: 180, value: 95000 },
  { date: format(subDays(new Date(), 4), "MMM d"), volume: 300, value: 150000 },
  { date: format(subDays(new Date(), 3), "MMM d"), volume: 220, value: 110000 },
  { date: format(subDays(new Date(), 2), "MMM d"), volume: 280, value: 140000 },
  { date: format(subDays(new Date(), 1), "MMM d"), volume: 190, value: 100000 },
  { date: format(new Date(), "MMM d"), volume: 350, value: 180000 },
];
