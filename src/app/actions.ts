"use server";

import { summarizeOrder, OrderSummaryInput } from "@/ai/flows/order-summarization";
import type { CartItem } from "@/lib/types";

export async function summarizeOrderAction(
  cartItems: CartItem[],
  customerId: string
) {
  if (!cartItems || cartItems.length === 0) {
    return { error: "Le panier est vide." };
  }
  if (!customerId) {
    return { error: "Le nom du client est requis." };
  }

  try {
    const orderInput: OrderSummaryInput = {
      customerId,
      items: cartItems.map((item) => ({
        productId: item.variantId,
        quantity: item.quantity,
        pricePerUnit: item.price,
      })),
    };

    const summary = await summarizeOrder(orderInput);
    return { summary };
  } catch (error) {
    console.error("Error summarizing order:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { error: `Impossible de générer le résumé de la commande: ${errorMessage}` };
  }
}
