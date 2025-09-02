"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import type { Category } from "@/lib/types";
import AppHeader from "@/components/header";
import ProductList from "@/components/product-list";
import CategoryNav from "@/components/category-nav";
import Footer from "@/components/footer";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} showSearch={true} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <CategoryNav
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ProductList products={filteredProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
