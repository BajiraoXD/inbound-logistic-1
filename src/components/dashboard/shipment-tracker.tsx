"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  predictShipmentETA,
  type PredictShipmentETAOutput,
} from "@/ai/flows/predict-shipment-eta";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "../ui/progress";

const formSchema = z.object({
  trackingNumber: z.string().min(5, "Tracking number is too short."),
  carrier: z.string().min(2, "Please select a carrier."),
});

const carriers = ["UPS", "FedEx", "USPS", "DHL", "Other"];

export default function ShipmentTracker() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictShipmentETAOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackingNumber: "",
      carrier: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const prediction = await predictShipmentETA(values);
      setResult(prediction);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to predict ETA. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          AI-Powered ETA Prediction
        </CardTitle>
        <CardDescription>
          Enter a tracking number to predict its arrival time.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="trackingNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tracking Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1Z999AA10123456784" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carrier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carrier</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a carrier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {carriers.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Predict ETA
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent className="mt-4 border-t pt-4">
          <CardTitle className="text-lg mb-2">Prediction Result</CardTitle>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Predicted ETA</span>
              <span className="font-medium">{result.predictedETA}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Confidence</span>
              <div className="w-1/2 flex items-center gap-2">
                <Progress
                  value={result.confidenceLevel * 100}
                  className="h-2"
                />
                <span className="font-medium">
                  {(result.confidenceLevel * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Possible Delay</span>
              <span
                className={`font-medium ${
                  result.possibleDelay
                    ? "text-destructive"
                    : "text-accent-foreground"
                }`}
              >
                {result.possibleDelay ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Reasoning</span>
              <p className="mt-1 font-medium bg-secondary p-3 rounded-md">
                {result.reasoning}
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
