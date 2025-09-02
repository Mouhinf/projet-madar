export default function Footer() {
  return (
    <footer className="bg-primary/10">
      <div className="container mx-auto py-6 px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Madar Wholesale. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
