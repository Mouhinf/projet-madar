"use client";

import { Search, ShoppingCart, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Cart from "@/components/cart";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface AppHeaderProps {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  showSearch?: boolean;
}

export default function AppHeader({ searchTerm, setSearchTerm, showSearch = true }: AppHeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-primary/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="font-headline text-xl font-bold md:text-2xl text-primary-foreground">
          <Link href="/">
            Madar Vente en Gros
          </Link>
        </h1>
        <div className="flex items-center gap-2">
          {showSearch && setSearchTerm && (
             <div className="relative hidden md:block">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input
                 type="search"
                 placeholder="Rechercher des produits..."
                 className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
          )}
           <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/50 hover:text-primary-foreground" asChild>
                  <Link href="/howto">
                    <HelpCircle className="h-6 w-6" />
                    <span className="sr-only">Comment commander</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Comment commander</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary/50 hover:text-primary-foreground">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Ouvrir le panier</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col p-0 sm:max-w-lg">
              <Cart />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
