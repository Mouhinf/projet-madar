'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing order information,
 * including dynamic pricing based on wholesale quantities.
 *
 * - summarizeOrder - A function that takes order details as input and returns a summarized order with total price.
 * - OrderSummaryInput - The input type for the summarizeOrder function.
 * - OrderSummaryOutput - The return type for the summarizeOrder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OrderItemSchema = z.object({
  productId: z.string().describe('The ID of the product.'),
  quantity: z.number().int().positive().describe('The quantity of the product ordered.'),
  pricePerUnit: z.number().positive().describe('The price per unit of the product.'),
});

const OrderSummaryInputSchema = z.object({
  customerId: z.string().describe('The ID of the customer.'),
  items: z.array(OrderItemSchema).describe('The list of items in the order.'),
});
export type OrderSummaryInput = z.infer<typeof OrderSummaryInputSchema>;

const OrderSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the order including total price and items ordered.'),
  totalPrice: z.number().describe('The total price of the order.'),
});
export type OrderSummaryOutput = z.infer<typeof OrderSummaryOutputSchema>;

export async function summarizeOrder(input: OrderSummaryInput): Promise<OrderSummaryOutput> {
  return summarizeOrderFlow(input);
}

const summarizeOrderPrompt = ai.definePrompt({
  name: 'summarizeOrderPrompt',
  input: {
    schema: OrderSummaryInputSchema,
  },
  output: {
    schema: OrderSummaryOutputSchema,
  },
  prompt: `You are an order summarization expert. You take in customer orders and produce a concise summary of the order details, including the total price. The summary should include a list of the products ordered and their quantities.  You must compute the total price of the order by multiplying the quantity of each item by its price per unit and summing the results. Be concise.

Customer ID: {{{customerId}}}
Items: {{#each items}}{{{productId}}} x {{{quantity}}} at {{{pricePerUnit}}} each{{#unless @last}}, {{/unless}}{{/each}}
`,
});

const summarizeOrderFlow = ai.defineFlow(
  {
    name: 'summarizeOrderFlow',
    inputSchema: OrderSummaryInputSchema,
    outputSchema: OrderSummaryOutputSchema,
  },
  async input => {
    const totalPrice = input.items.reduce((acc, item) => acc + (item.quantity * item.pricePerUnit), 0);

    const {output} = await summarizeOrderPrompt({
      ...input,
    });

    return {
      ...output,
      totalPrice,
      summary: output.summary ?? `Order summary for customer ${input.customerId} with total price ${totalPrice}`,
    };
  }
);
