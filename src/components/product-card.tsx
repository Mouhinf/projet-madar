"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product, ProductVariant } from "@/lib/types";
import { PlusCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (variant: ProductVariant) => {
    addToCart({
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      variantSize: variant.size,
      price: variant.price,
      image: product.image,
      dataAiHint: product.dataAiHint,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={product.dataAiHint}
          />
        </div>
        <div className="p-4">
          <CardTitle className="font-headline text-lg">{product.name}</CardTitle>
          <CardDescription className="mt-1 h-10 overflow-hidden text-ellipsis">
            {product.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Conditionnements :</h4>
          <ul className="space-y-2">
            {product.variants.map((variant) => (
              <li key={variant.id} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{variant.size}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{variant.price.toLocaleString()} CFA</span>
                  <Button size="sm" variant="ghost" onClick={() => handleAddToCart(variant)} className="h-8 w-8 p-0">
                    <PlusCircle className="h-5 w-5 text-primary" />
                    <span className="sr-only">Ajouter au panier</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
