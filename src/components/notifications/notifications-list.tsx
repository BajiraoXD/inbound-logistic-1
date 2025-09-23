import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_NOTIFICATIONS } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCheck, Package, AlertTriangle } from "lucide-react";

const iconMap: { [key: string]: React.ElementType } = {
  "Shipment Delayed": AlertTriangle,
  "Shipment Delivered": CheckCheck,
  "Low Stock Warning": Package,
  default: Bell,
};

export default function NotificationsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Notifications</CardTitle>
        <CardDescription>
          Here's a list of your recent notifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flow-root">
          <ul className="-mb-8">
            {MOCK_NOTIFICATIONS.map((notification, notificationIdx) => {
              const Icon = iconMap[notification.title] || iconMap.default;
              return (
                <li key={notification.id}>
                  <div className="relative pb-8">
                    {notificationIdx !== MOCK_NOTIFICATIONS.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-border"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div>
                        <div
                          className={`relative px-1 ${
                            notification.read
                              ? "text-muted-foreground"
                              : "text-primary"
                          }`}
                        >
                          <div className="h-8 w-8 bg-secondary rounded-full ring-8 ring-card flex items-center justify-center">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 py-1.5">
                        <div className="text-sm text-foreground">
                          <span className="font-medium">
                            {notification.title}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {formatDistanceToNow(
                            new Date(notification.timestamp),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 mt-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
