"use server";
/**
 * @fileOverview Predicts the Estimated Time of Arrival (ETA) for inbound shipments using AI.
 *
 * - predictShipmentETA - A function that predicts the ETA for a given shipment tracking number.
 * - PredictShipmentETAInput - The input type for the predictShipmentETA function.
 * - PredictShipmentETAOutput - The return type for the predictShipmentETA function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const PredictShipmentETAInputSchema = z.object({
  trackingNumber: z
    .string()
    .describe("The tracking number of the inbound shipment."),
  carrier: z.string().describe("The carrier of the inbound shipment."),
  shipmentHistory: z
    .string()
    .optional()
    .describe(
      "Historical data of the shipment including dates, locations, and status updates."
    ),
  expectedDeliveryDate: z
    .string()
    .optional()
    .describe("The initial expected delivery date of the shipment."),
});
export type PredictShipmentETAInput = z.infer<
  typeof PredictShipmentETAInputSchema
>;

const PredictShipmentETAOutputSchema = z.object({
  predictedETA: z
    .string()
    .describe("The predicted Estimated Time of Arrival for the shipment."),
  confidenceLevel: z
    .number()
    .describe(
      "A numerical value (0-1) representing the confidence level of the ETA prediction."
    ),
  reasoning: z
    .string()
    .describe(
      "Explanation of factors/data used to arrive at the predicted ETA, useful for understanding and trust."
    ),
  possibleDelay: z
    .boolean()
    .describe("Whether shipment is possibly delayed or not."),
});
export type PredictShipmentETAOutput = z.infer<
  typeof PredictShipmentETAOutputSchema
>;

export async function predictShipmentETA(
  input: PredictShipmentETAInput
): Promise<PredictShipmentETAOutput> {
  return predictShipmentETAFlow(input);
}

const prompt = ai.definePrompt({
  name: "predictShipmentETAPrompt",
  input: { schema: PredictShipmentETAInputSchema },
  output: { schema: PredictShipmentETAOutputSchema },
  prompt: `You are an AI logistics expert specializing in predicting shipment ETAs.

  Based on the tracking number, carrier, shipment history (if available), and the initial expected delivery date (if available), predict the Estimated Time of Arrival (ETA) for the inbound shipment.
  Also determine and set the possibleDelay field, based on your predicted ETA. The confidence level should be between 0 and 1.

  Tracking Number: {{{trackingNumber}}}
  Carrier: {{{carrier}}}
  Shipment History: {{{shipmentHistory}}}
  Expected Delivery Date: {{{expectedDeliveryDate}}}
  `,
});

const predictShipmentETAFlow = ai.defineFlow(
  {
    name: "predictShipmentETAFlow",
    inputSchema: PredictShipmentETAInputSchema,
    outputSchema: PredictShipmentETAOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
