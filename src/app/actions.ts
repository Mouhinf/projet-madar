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
        productId: `${item.name} (${item.variantSize})`,
        quantity: item.quantity,
        pricePerUnit: item.price,
      })),
    };

    const summary = await summarizeOrder(orderInput);
    return { summary };
  } catch (error) {
    console.error("Error summarizing order:", error);
    return { error: "Impossible de générer le résumé de la commande." };
  }
}
