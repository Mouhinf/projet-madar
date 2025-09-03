"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Minus, Plus, Trash2, Loader2, Sparkles, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { summarizeOrderAction } from "@/app/actions";
import { OrderSummaryOutput } from "@/ai/flows/order-summarization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<OrderSummaryOutput | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Géolocalisation non supportée",
        description: "Votre navigateur ne supporte pas la géolocalisation.",
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCustomerDetails((prev) => ({
          ...prev,
          address: `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`,
        }));
        setIsLocating(false);
        toast({
          title: "Localisation obtenue",
          description: "Votre adresse a été mise à jour.",
        });
      },
      (error) => {
        setIsLocating(false);
        toast({
          variant: "destructive",
          title: "Erreur de localisation",
          description: "Impossible d'obtenir votre position. Veuillez vérifier vos autorisations.",
        });
      },
      { timeout: 10000 }
    );
  };

  const handleSummarizeOrder = () => {
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      toast({
        variant: "destructive",
        title: "Informations manquantes",
        description: "Veuillez remplir tous les détails du client.",
      });
      return;
    }
    setIsSummarizing(true);
    startTransition(async () => {
      const result = await summarizeOrderAction(cart, customerDetails.name);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Erreur de résumé",
          description: result.error,
        });
      } else {
        setSummary(result.summary);
      }
      setIsSummarizing(false);
    });
  };
  
  const handlePlaceOrder = () => {
    toast({
      title: "Commande validée !",
      description: "Notre livreur vous contactera bientôt. Merci pour votre confiance.",
    });
    clearCart();
    setSummary(null);
    setCustomerDetails({ name: "", phone: "", address: "" });
  };

  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <SheetHeader className="p-4 border-b">
        <SheetTitle>Votre Panier ({totalItems})</SheetTitle>
      </SheetHeader>

      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center p-4">
          <p className="text-muted-foreground">Votre panier est vide.</p>
          <p className="text-sm text-muted-foreground">Parcourez nos produits et ajoutez-les au panier.</p>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Cart items */}
              {cart.map((item) => (
                <div key={item.variantId} className="flex items-start gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      data-ai-hint={item.dataAiHint}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.variantSize}</p>
                    <p className="text-sm font-semibold">{(item.price * item.quantity).toLocaleString('fr-FR')} CFA</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.variantId)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Separator />

              {/* Customer details */}
              <div className="space-y-2">
                <h4 className="font-medium">Informations de livraison</h4>
                <div className="space-y-2">
                   <Label htmlFor="name">Nom du client / Boutique</Label>
                   <Input id="name" name="name" value={customerDetails.name} onChange={handleInputChange} placeholder="Ex: Boutique Chez Ali" />
                </div>
                 <div className="space-y-2">
                   <Label htmlFor="phone">Téléphone</Label>
                   <Input id="phone" name="phone" type="tel" value={customerDetails.phone} onChange={handleInputChange} placeholder="Ex: 77 123 45 67" />
                </div>
                 <div className="space-y-2">
                   <div className="flex items-center justify-between">
                     <Label htmlFor="address">Adresse de livraison</Label>
                     <Button variant="link" size="sm" onClick={handleGeolocate} disabled={isLocating} className="h-auto p-0 text-xs">
                       {isLocating ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <MapPin className="mr-1 h-3 w-3" />}
                       {isLocating ? "Localisation..." : "Me localiser"}
                     </Button>
                   </div>
                   <Input id="address" name="address" value={customerDetails.address} onChange={handleInputChange} placeholder="Ex: 123 Rue de Dakar, Sénégal" />
                </div>
              </div>

              {/* Summary button and card */}
              <div className="space-y-4">
                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/80"
                  onClick={handleSummarizeOrder}
                  disabled={isSummarizing || isPending}
                >
                  {isSummarizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  {isSummarizing ? "Génération..." : "Obtenir le résumé de la commande"}
                </Button>
    
                {isPending && (
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Chargement du résumé...
                  </div>
                )}
    
                {summary && (
                  <Card className="bg-background">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Résumé de la commande</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{summary.summary}</p>
                       <p className="mt-2 text-right font-bold">Total Confirmé: {summary.totalPrice.toLocaleString('fr-FR')} CFA</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </ScrollArea>
          
          <SheetFooter className="p-4 border-t">
            <div className="w-full space-y-2">
               <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{totalPrice.toLocaleString('fr-FR')} CFA</span>
              </div>
              <Button className="w-full" disabled={!summary || isPending || isSummarizing} onClick={handlePlaceOrder}>
                Valider la commande
              </Button>
            </div>
          </SheetFooter>
        </>
      )}
    </div>
  );
}
