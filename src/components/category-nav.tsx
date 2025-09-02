"use client";

import { categories } from "@/lib/types";
import type { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
}

export default function CategoryNav({
  selectedCategory,
  setSelectedCategory,
}: CategoryNavProps) {
  return (
    <nav className="mb-8">
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="rounded-full"
        >
          Tous les produits
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>
    </nav>
  );
}
