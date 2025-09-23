"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  simulateInventoryProjections,
  type SimulateInventoryProjectionsOutput,
} from "@/ai/flows/simulate-inventory-projections";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Warehouse } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const formSchema = z.object({
  initialInventoryLevel: z.coerce.number().min(0, "Must be positive"),
  reorderPoint: z.coerce.number().min(0, "Must be positive"),
  reorderQuantity: z.coerce.number().min(1, "Must be at least 1"),
  leadTimeDays: z.coerce.number().min(0, "Must be positive"),
  dailyDemandMean: z.coerce.number().min(0, "Must be positive"),
  dailyDemandStdDev: z.coerce.number().min(0, "Must be positive"),
  simulationDays: z.coerce
    .number()
    .min(1, "Must be at least 1")
    .max(365, "Max 365 days"),
});

type FormValues = z.infer<typeof formSchema>;

const chartConfig = {
  inventory: {
    label: "Inventory",
    color: "hsl(var(--primary))",
  },
};

export default function InventorySimulation() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] =
    useState<SimulateInventoryProjectionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInventoryLevel: 1000,
      reorderPoint: 200,
      reorderQuantity: 500,
      leadTimeDays: 14,
      dailyDemandMean: 50,
      dailyDemandStdDev: 15,
      simulationDays: 90,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const simulationInput = {
        ...values,
        shipmentEtaDays: [5, 20], // Mock incoming shipments
        shipmentQuantities: [500, 500],
      };
      const prediction = await simulateInventoryProjections(simulationInput);
      setResult(prediction);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to run simulation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const chartData = result?.projectedInventoryLevels.map((level, day) => ({
    day: `Day ${day + 1}`,
    inventory: level,
  }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Warehouse className="h-5 w-5 text-primary" />
                Inventory Simulation
              </div>
            </CardTitle>
            <CardDescription>
              Project inventory levels based on your parameters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(form.getValues()).map((key) => {
                    const fieldName = key as keyof FormValues;
                    return (
                      <FormField
                        key={fieldName}
                        control={form.control}
                        name={fieldName}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize text-xs">
                              {fieldName.replace(/([A-Z])/g, " $1")}
                            </FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Run Simulation
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
            <CardDescription>
              {result
                ? "Projected inventory levels over time."
                : "Run a simulation to see results."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {result && chartData && (
              <div>
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg. Inventory
                    </p>
                    <p className="text-2xl font-bold">
                      {result.averageInventoryLevel.toFixed(0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Stockout Days
                    </p>
                    <p className="text-2xl font-bold text-destructive">
                      {result.stockoutDays}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Simulation Period
                    </p>
                    <p className="text-2xl font-bold">
                      {form.getValues().simulationDays} Days
                    </p>
                  </div>
                </div>
                <ChartContainer config={chartConfig} className="h-80 w-full">
                  <ResponsiveContainer>
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="inventory"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
