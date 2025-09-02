import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary/10">
      <div className="container mx-auto py-6 px-4 text-center text-muted-foreground">
        <div className="flex justify-center gap-4 mb-2">
            <Link href="/" className="text-sm hover:underline">Accueil</Link>
            <Link href="/howto" className="text-sm hover:underline">Comment commander</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Madar Wholesale. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
