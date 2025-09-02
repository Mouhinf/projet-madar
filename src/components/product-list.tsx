import type { Product } from "@/lib/types";
import ProductCard from "@/components/product-card";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-center">
        <div>
          <h2 className="text-2xl font-semibold">Aucun produit trouvé</h2>
          <p className="text-muted-foreground">
            Essayez d'ajuster votre recherche ou vos filtres.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
